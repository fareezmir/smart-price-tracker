import { Request, Response } from 'express';
import { ScraperFactory } from '../factories/ScraperFactory';

export const verifyLinkController = async (req: Request, res: Response): Promise<void> => {
   try {
    const productUrl = req.query.url;

    if (!productUrl || typeof(productUrl) !== 'string') {
        res.status(400).json({isValid: false, error: 'Missing or Invalid URL'})
        return;
    }

    const scraper = ScraperFactory.getScraper(productUrl);
    const productId = ScraperFactory.extractProductId(productUrl);
    const retailerName = scraper.getRetailerName();

    res.json({
        isValid: true,
        retailer: retailerName,
        productId: productId
    });

   } catch(err) {
        if (err instanceof Error) {
            res.status(400).json({ isValid: false, error: err.message});
        } else {
            res.status(500).json({ isValid: false, error: 'An unknown error occured. Please try again.'});
        }
   } 
}