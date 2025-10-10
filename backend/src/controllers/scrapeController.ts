import type {Request, Response} from 'express';
import type {Product} from '../types';
import {URL} from 'url';
import { ScraperFactory } from '../factories/ScraperFactory';

//Make sure that the obj is actually formatted as a Product (TypeScript type guard)
function isProduct(obj: unknown): obj is Product {
    return typeof obj === 'object' && obj !== null &&
     'title' in obj && typeof (obj as any).title === 'string' &&
     'price' in obj && typeof (obj as any).price === 'number' && 
     'currency' in obj && typeof (obj as any).currency === 'string'
}

//Controller for scraping
export const scrapeController = async (req:Request, res:Response): Promise<void> => {
    try{
        const productURL = req.query.url;
    
        if (!productURL || typeof productURL !== 'string') {
            res.status(400).json({error: 'Missing ProductURL or URL invalid'});
            return;
        }
        
        const scraper = ScraperFactory.getScraper(productURL);
        const productId = ScraperFactory.extractProductId(productURL);
        const productDataObj: Product = await scraper.scrapeProduct(productURL);
        
        if (!isProduct(productDataObj)) {
            res.status(500).json({error: 'Invalid product format'});
            return;
        }
        await scraper.savePricePoint(productId, productDataObj.price);
        res.json(productDataObj);
    }
    catch (err) {
        console.error('READ ERROR:', err);
        res.status(500).json({error: 'Failed to load product data'});
    }
    
}