import { TrackedProduct, Product } from '../types/product_type';
import { DatabaseProductRepository } from '../repositories/DatabaseProductRepository';
import { ScraperInterface } from '../interfaces/ScraperInterface';

export abstract class BaseScraper implements ScraperInterface {
    constructor(protected productRepository: DatabaseProductRepository) {}
    
    abstract scrapeProduct(url: string): Promise<Product>;
    abstract getRetailerName(): string;
    
    async getTrackedProduct(productId: string): Promise<TrackedProduct> {
        const products = await this.productRepository.getAllTrackedProducts();
        const product = products.find(p => p.productId === productId);
        
        if (!product) {
            throw new Error(`No tracked product found for ${productId}`);
        }
        
        return product;
    }
    
    async trackProduct(productId: string, url: string, product: Product): Promise<void> {
        // Create TrackedProduct object
        const trackedProduct: TrackedProduct = {
            productId,
            url,
            retailer: this.getRetailerName(),
            currency: product.currency,
            title: product.title,
            imageUrl: product.imageUrl,
            lastUpdated: new Date().toISOString(),
            priceHistory: [{
                price: product.price,
                timestamp: new Date().toISOString()
            }]
        };
        
        // Save to PostgreSQL
        await this.productRepository.saveTrackedProduct(trackedProduct);
    }
}
