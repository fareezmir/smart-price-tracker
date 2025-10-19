import type { Request, Response } from 'express';
import type { TrackedProduct } from '../../types/product_type';
import { DatabaseProductRepository } from '../../repositories/DatabaseProductRepository';


export const getUserProductsController = async (req:Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        if (!userId || typeof userId !== 'string') {
            res.status(400).json({ error: 'Invalid userId' });
            return;
        }

        const productRepository = new DatabaseProductRepository();
        const userProducts: TrackedProduct[] = await productRepository.getTrackedProductsByUser(userId);

        res.json(userProducts);
    } catch (err) {
        console.error('Could not get the user\'s product', err);
        res.status(500).json({ error: 'Failed to fetch user\'s product' });
    }
};