import { ProductRepositoryInterface } from "../interfaces/ProductRepositoryInterface";
import { ScraperFactory } from "../factories/ScraperFactory";

export class ScheduledScraper {
    constructor(private productRepository: ProductRepositoryInterface) {}

    async scrapeAllProducts(): Promise<void> {
        const products = await this.productRepository.getAllTrackedProducts();

        for (const product of products) {
            try {
                const scraper = ScraperFactory.getScraper(product.url)
                const currentProduct = await scraper.scrapeProduct(product.url)
                await scraper.trackProduct(product.productId, product.url, currentProduct)
            } catch (err) {
                console.error(`Could not scrape product with ID ${product.productId}`, err)
            }
        }  
    }
}