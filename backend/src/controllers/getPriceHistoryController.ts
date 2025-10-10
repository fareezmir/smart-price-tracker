import type {Request, Response} from 'express';
import type {PriceHistory} from '../types';
import { ScraperFactory } from '../factories/ScraperFactory';
import { validateUrl } from '../utils/urlUtils';


export const getPriceHistoryController = async (req:Request, res: Response): Promise<void> => {
    try {
        const normalizedUrl = validateUrl(req.query.url);

        if (!normalizedUrl) {
            res.status(400).json({error: 'Missing ProductURL or URL invalid'});
            return;
        }

        const scraper = ScraperFactory.getScraper(normalizedUrl);
        const productId = ScraperFactory.extractProductId(normalizedUrl);
        
        if (!productId) {
            res.status(400).json({error: 'Missing Item ID in Product URL'});
            return;
        }

        const productHistory: PriceHistory = await scraper.getProductHistory(productId); 
        res.json(productHistory);

    } catch(err) {
        console.log(err);
        res.status(404).json({error: "No history file exists."});
    }
}