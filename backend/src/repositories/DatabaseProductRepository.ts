import { ProductRepositoryInterface } from '../interfaces/ProductRepositoryInterface';
import { TrackedProduct } from '../types/product_type';
import { Client } from 'pg';

export class DatabaseProductRepository implements ProductRepositoryInterface {
    private createClient(): Client {
        return new Client({
            host: 'localhost',
            port: 5432,
            database: 'smart_price_tracker',
            user: 'postgres',
            password: 'postgres123'
        });
    }

    async getAllTrackedProducts(): Promise<TrackedProduct[]> {
        const client = this.createClient();
        try {
            await client.connect();

            const allProducts = await client.query('SELECT * FROM products');
            const trackedProducts: TrackedProduct[] = [];

           
            for (const product of allProducts.rows) {
                const priceHistoryDatabase = await client.query(
                    'SELECT price, timestamp FROM price_history WHERE product_id = $1 ORDER BY timestamp',
                    [product.product_id]
                );
                
                 // Get price history for each of the products since products data table doesn't have them
                const priceHistory = priceHistoryDatabase.rows.map(row => {
                    return {
                        price: typeof row.price === 'number' ? row.price : parseFloat(row.price),
                        timestamp: row.timestamp.toISOString()
                    }
                })

                // Create final trackedProduct object to push into trackedProducts
                const trackedProduct: TrackedProduct = {
                    productId: product.product_id,
                    url: product.url,
                    retailer: product.retailer,
                    currency: product.currency,
                    title: product.title,
                    imageUrl: product.image_url,
                    lastUpdated: product.last_updated,
                    priceHistory: priceHistory
                };

                trackedProducts.push(trackedProduct);
            }

            return trackedProducts;

           
        } catch (err) {
            console.error('Error reading the database:', err)
            return [];
        } finally {
            await client.end();
        }
    }

    async saveTrackedProduct(trackedProduct: TrackedProduct): Promise<void> {
        const client = this.createClient();
        try {
            await client.connect();

            const dateToday = new Date().toISOString();

            const existingProduct = await client.query(
                'SELECT product_id FROM products WHERE product_id = $1',
                [trackedProduct.productId]
            );
            
            // If the product doesn't exist, add it to the database
            if (existingProduct.rows.length === 0) {
                await client.query(
                    'INSERT INTO products (product_id, url, retailer, currency, title, image_url, last_updated) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                    [trackedProduct.productId, trackedProduct.url, trackedProduct.retailer, trackedProduct.currency, trackedProduct.title, trackedProduct.imageUrl, trackedProduct.lastUpdated]
                );
            } else {
                // If the product does exist, update the database instead
                await client.query(
                    'UPDATE products SET title = $1, image_url = $2, last_updated = $3 WHERE product_id = $4',
                    [trackedProduct.title, trackedProduct.imageUrl, trackedProduct.lastUpdated, trackedProduct.productId]
                );
            }

            // And insert the new price point of it (both cases)
            await client.query(
                'INSERT INTO price_history (product_id, price, timestamp) VALUES ($1, $2, $3)',
                [trackedProduct.productId, trackedProduct.priceHistory[trackedProduct.priceHistory.length - 1].price, trackedProduct.priceHistory[trackedProduct.priceHistory.length - 1].timestamp]
            );
            
        } catch (err) {
            console.error('Error saving to database:', err);
            throw err;
        } finally {
            await client.end();
        }
    }

}