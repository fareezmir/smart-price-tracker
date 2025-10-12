import { TrackedProduct, PricePoint, Product } from '../types/product_type';
import { ScraperInterface } from '../interfaces/ScraperInterface';

import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';

export class NeweggScraper implements ScraperInterface {

    async scrapeProduct(url:string): Promise<Product> {

        try {
            const response = await axios.get(url);
            const html = response.data; //html string of the website

            const $ =  cheerio.load(html);

            const title: string = $('h1.product-title').text();
            const priceText: string = $('div.price-current').text().trim();
            const price: number = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            const imageUrl: string = $('img.product-view-img-original').attr('src') || '';

            if (!title || isNaN(price) || !imageUrl) {
                throw new Error('Price, Image or Title could not be found.');
            }

            return {title: title, price: price, currency:'CAD', imageUrl: imageUrl}; 

        }catch(err){
            console.log(err);
            throw new Error('Failed to scrape product.');
        }
        

    }

    async getTrackedProduct(productId: string): Promise<TrackedProduct> {
        try {
            const filePath:string = `data/history/${productId}.json`;
            const data:string = await fs.readFile(filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            throw new Error(`No tracked product found for ${productId}`);
        }
    }

    async trackProduct(productId: string, url: string, product: Product): Promise<void> {
        const filePath: string = `data/history/${productId}.json`;
        
        let trackedProduct: TrackedProduct;
        
        try {
            const productData: string = await fs.readFile(filePath, 'utf-8');
            trackedProduct = JSON.parse(productData);
        } catch(err){
            // File not found, thus create a new trackedProduct
            trackedProduct = {
                productId: productId,
                url: url,
                retailer: this.getRetailerName(),
                currency: product.currency,
                title: product.title,
                imageUrl: product.imageUrl,
                lastUpdated: new Date().toISOString(),
                priceHistory: []
            };
        }
        
        const dateScraped: string = new Date().toISOString();

        const newPricePoint: PricePoint = {price: product.price, timestamp: dateScraped};
        trackedProduct.priceHistory.push(newPricePoint);

        trackedProduct = {
            ...trackedProduct,
            lastUpdated: dateScraped,
            title: product.title,
            imageUrl: product.imageUrl
        };

        await fs.writeFile(filePath, JSON.stringify(trackedProduct, null, 2));
    }

    getRetailerName():string {
        return 'Newegg';
    }

}