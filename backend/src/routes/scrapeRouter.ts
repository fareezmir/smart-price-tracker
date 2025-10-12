import express from 'express';

import { scrapeController } from '../controllers/scrapeController';
import { getUserProductsController } from '../controllers/getUserProductsController';
import { verifyLinkController } from '../controllers/verifyLinkController';
import { trackController } from '../controllers/trackController';

export const scrapeRouter = express.Router();

scrapeRouter.get('/scrape', scrapeController);

scrapeRouter.post('/track', trackController);

scrapeRouter.get('/history', getUserProductsController);

scrapeRouter.get('/verify-link', verifyLinkController);