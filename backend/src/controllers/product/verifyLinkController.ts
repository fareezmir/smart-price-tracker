import { Request, Response } from 'express';
import { ScraperFactory } from '../../factories/ScraperFactory';
import { DatabaseProductRepository } from '../../repositories/DatabaseProductRepository';
import { validateUrl } from '../../utils/urlUtils';

export const verifyLinkController = async (req: Request, res: Response): Promise<void> => {
   try {
    const normalizedUrl = validateUrl(req.query.url);

    if (!normalizedUrl) {
        res.status(400).json({isValid: false, error: 'Invalid URL. Please paste a valid URL'});
        return;
    }

    const productRepository = new DatabaseProductRepository();
    const scraper = ScraperFactory.getScraper(normalizedUrl, productRepository);
    const productId = ScraperFactory.extractProductId(normalizedUrl);
    const retailerName = scraper.getRetailerName();

    res.json({
        isValid: true,
        retailer: retailerName,
        productId: productId
    });

   } catch(err) {
        if (err instanceof Error) {
            if (err.message.includes('Unsupported retailer')) {
                res.status(200).json({
                    isValid: false,
                    error: 'This is a valid URL but it\'s currently not supported!'
                });
            } else {
                res.status(400).json({ isValid: false, error: 'err.message'});
            }
        } else {
            res.status(500).json({ isValid: false, error: 'An unknown error occured. Please try again.'});
        }
   } 
};