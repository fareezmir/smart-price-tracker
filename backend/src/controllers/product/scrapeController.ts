import type {Request, Response} from 'express';
import type {Product} from '../../types/product_type';
import { ScraperFactory } from '../../factories/ScraperFactory';
import { validateUrl } from '../../utils/urlUtils';
import { DatabaseProductRepository } from '../../repositories/DatabaseProductRepository';

//Make sure that the obj is actually formatted as a Product (TypeScript type guard)
function isProduct(obj: unknown): obj is Product {
    return typeof obj === 'object' && obj !== null &&
     'title' in obj && typeof (obj as Record<string, unknown>).title === 'string' &&
     'price' in obj && typeof (obj as Record<string, unknown>).price === 'number' && 
     'currency' in obj && typeof (obj as Record<string, unknown>).currency === 'string';
}

//Controller for scraping
export const scrapeController = async (req:Request, res:Response): Promise<void> => {
    try{
        const formattedUrl = validateUrl(req.query.url);
    
        if (!formattedUrl) {
            res.status(400).json({error: 'Missing ProductURL or URL invalid'});
            return;
        }
        
        const productRepository = new DatabaseProductRepository();
        const scraper = ScraperFactory.getScraper(formattedUrl, productRepository);
        const productId = ScraperFactory.extractProductId(formattedUrl);
        const product: Product = await scraper.scrapeProduct(formattedUrl);
        
        if (!isProduct(product)) {
            res.status(500).json({error: 'Invalid product format'});
            return;
        }
        await scraper.trackProduct(productId, formattedUrl, product);
        const trackedProduct = await scraper.getTrackedProduct(productId);
        res.json(trackedProduct);
    }
    catch (err) {
        console.error('READ ERROR:', err);
        res.status(500).json({error: 'Failed to load product data'});
    }
    
};