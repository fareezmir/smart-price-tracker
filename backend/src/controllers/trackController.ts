import type { Request, Response } from 'express';
import type { Product } from '../types/product_type';
import { ScraperFactory } from '../factories/ScraperFactory';
import { DatabaseProductRepository } from '../repositories/DatabaseProductRepository';
import { validateUrl } from '../utils/urlUtils';

function isProduct(obj: unknown): obj is Product {
    return typeof obj === 'object' && obj !== null &&
     'title' in obj && typeof (obj as Record<string, unknown>).title === 'string' &&
     'price' in obj && typeof (obj as Record<string, unknown>).price === 'number' && 
     'currency' in obj && typeof (obj as Record<string, unknown>).currency === 'string' &&
     'imageUrl' in obj && typeof (obj as Record<string, unknown>).imageUrl === 'string';
}

export const trackController = async (req: Request, res: Response): Promise<void> => {
    try {
        const url = req.body.url;
        const userId = req.body.userId;
         
        
        if (!url || typeof url !== 'string' ||!userId || typeof userId !== 'string') {
            res.status(400).json({ error: 'Missing or invalid URL or userId' });
            return;
        }

        const formattedUrl = validateUrl(url);
        if (!formattedUrl) {
            res.status(400).json({ error: 'Invalid URL format' });
            return;
        }

        const productRepository = new DatabaseProductRepository();
        const scraper = ScraperFactory.getScraper(formattedUrl, productRepository);
        const productId = ScraperFactory.extractProductId(formattedUrl);

        if (!productId) {
            res.status(400).json({ error: 'Could not extract product ID from URL' });
            return;
        }

        try {
            const existing = await scraper.getTrackedProduct(productId);
            await productRepository.linkUserToProduct(userId, productId);
            res.json(existing);
        } catch {
            const product: Product = await scraper.scrapeProduct(formattedUrl);
            
            if (!isProduct(product)) {
                res.status(500).json({ error: 'Invalid product format' });
                return;
            }

            await scraper.trackProduct(productId, formattedUrl, product);
            const trackedProduct = await scraper.getTrackedProduct(productId);
            await productRepository.linkUserToProduct(userId, productId);
            res.json(trackedProduct);
        }

    } catch (err) {
        console.error('Track error:', err);
        if (err instanceof Error) {
            if (err.message.includes('Unsupported retailer')) {
                res.status(400).json({ error: err.message });
            } else {
                res.status(500).json({ error: err.message });
            }
        } else {
            res.status(500).json({ error: 'Failed to track product' });
        }
    }
};
