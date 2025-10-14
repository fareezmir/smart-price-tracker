import { ProductRepositoryInterface } from "../interfaces/ProductRepositoryInterface";
import { ScraperFactory } from "../factories/ScraperFactory";

export class ScheduledScraper {
    constructor(private productRepository: ProductRepositoryInterface) {}

    async scrapeAllProducts(): Promise<void> {
        console.log('Starting scheduled scraping...');
        
        try {
            const products = await this.productRepository.getAllTrackedProducts();
            console.log(`Found ${products.length} products to scrape`);

            for (const product of products) {
                try {
                    console.log(`🔍 Scraping ${product.productId} (${product.retailer})...`);
                    
                    const scraper = ScraperFactory.getScraper(product.url)
                    const currentProduct = await scraper.scrapeProduct(product.url)
                    await scraper.trackProduct(product.productId, product.url, currentProduct)
                    
                    console.log(`✅ Successfully scraped ${product.productId} - Price: ${currentProduct.currency} ${currentProduct.price}`);
                    
                    // Add 2-second delay between requests to avoid rate limiting
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                } catch (err) {
                    console.error(`Failed to scrape ${product.productId}:`, err);
                }
            }
            
            console.log('✅ Scheduled scraping completed successfully');
        } catch (error) {
            console.error('Scheduled scraping failed:', error);
        }
    }
}