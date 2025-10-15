import { TrackedProduct, Product } from '../types/product_type';

export interface ScraperInterface {
    scrapeProduct(url:string): Promise<Product>;
    getTrackedProduct(productId:string): Promise<TrackedProduct>;
    getRetailerName():string;
    trackProduct(
        productId: string,
        url: string,
        product: Product,
    ): Promise<void>;
}