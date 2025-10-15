import { DatabaseProductRepository } from '../repositories/DatabaseProductRepository';
import { ScraperFactory } from "../factories/ScraperFactory";

export class ScheduledScraper {
    constructor(private productRepository: DatabaseProductRepository) {}

    async scrapeAllProducts(): Promise<void> {
        console.log('Starting scheduled scraping...');
        
        try {
            const products = await this.productRepository.getAllTrackedProducts();
            for (const product of products) {
                try {

                    const scraper = ScraperFactory.getScraper(product.url, this.productRepository)
                    const currentProduct = await scraper.scrapeProduct(product.url)
                    await scraper.trackProduct(product.productId, product.url, currentProduct)
                                        
                    // Add 2-second delay between requests to avoid rate limiting
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                } catch (err) {
                    console.error(`Failed to scrape ${product.productId}:`, err);
                }
            }
    
        } catch (error) {
            console.error('Scheduled scraping failed:', error);
        }
    }
}