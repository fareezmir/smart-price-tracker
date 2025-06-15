import {PriceHistory, Product} from '../types'


export interface ScraperInterface {
    scrapeProduct(url:string): Promise<Product>
    getProductHistory(productId:string): Promise<PriceHistory>
    getRetailerName():string
}