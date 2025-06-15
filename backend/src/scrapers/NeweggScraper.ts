import {PriceHistory, Product} from '../types'
import { ScraperInterface } from '../interfaces/ScraperInterface'

export class NeweggScraper implements ScraperInterface {

    async scrapeProduct(url:string):Promise<Product> {
        return {title: "Nvidia 3080", price: 101, currency:"CAD"}
    }

    async getProductHistory(productId:string):Promise<PriceHistory> {
        return [{price: 101, timestamp: "9/10/2025"}, {price: 98, timestamp: "10/06/2025"}, {price: 90, timestamp: "10/31/2025"}]     
    }

    getRetailerName():string {
        return 'NewEgg'
    }

}