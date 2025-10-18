import { Product } from '../types/product_type';
import { BaseScraper } from './BaseScraper';
import { DatabaseProductRepository } from '../repositories/DatabaseProductRepository';

import axios from 'axios';
import * as cheerio from 'cheerio';

export class AmazonScraper extends BaseScraper {
    constructor(productRepository: DatabaseProductRepository) {
        super(productRepository);
    }

    async scrapeProduct(url:string): Promise<Product> {

        try {
            
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });

            const html = response.data; //html string of the website

            const $ =  cheerio.load(html);

            const title: string = $('#productTitle').text().trim();

            const priceWhole: string = $('.a-price-whole').text().trim();
            const priceFraction: string = $('.a-price-fraction').text().trim();
            const price: number = parseFloat(`${priceWhole}.${priceFraction}`);

            const imageUrl: string = $('#landingImage').attr('src') || '';

            if (!title || isNaN(price) || !imageUrl) {
                throw new Error('Price, Image or Title could not be found.');
            }

            const currency = url.includes('.ca') ? 'CAD' : 'USD';
            return {title: title, price: price, currency: currency, imageUrl: imageUrl}; 

        }catch(err){
            console.log(err);
            throw new Error('Failed to scrape product.');
        }
        

    }


    getRetailerName():string {
        return 'Amazon';
    }

}