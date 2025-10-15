import type {Request, Response} from 'express';
import type {TrackedProduct} from '../types/product_type';
import { ScraperFactory } from '../factories/ScraperFactory';
import { validateUrl } from '../utils/urlUtils';
import { DatabaseProductRepository } from '../repositories/DatabaseProductRepository';


export const getUserProductsController = async (req:Request, res: Response): Promise<void> => {
    try {
        const normalizedUrl = validateUrl(req.query.url);

        if (!normalizedUrl) {
            res.status(400).json({error: 'Missing ProductURL or URL invalid'});
            return;
        }

        const productRepository = new DatabaseProductRepository();
        const scraper = ScraperFactory.getScraper(normalizedUrl, productRepository);
        const productId = ScraperFactory.extractProductId(normalizedUrl);
        
        if (!productId) {
            res.status(400).json({error: 'Missing Item ID in Product URL'});
            return;
        }

        const trackedProduct: TrackedProduct = await scraper.getTrackedProduct(productId); 
        res.status(200).json(trackedProduct);

    } catch(err) {
        console.log(err);
        res.status(404).json({error: 'No history file exists.'});
    }
};