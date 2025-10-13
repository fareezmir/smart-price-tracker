import express from 'express';

import { scrapeController } from '../controllers/scrapeController';
import { getUserProductsController } from '../controllers/getUserProductsController';
import { verifyLinkController } from '../controllers/verifyLinkController';
import { trackController } from '../controllers/trackController';

export const scrapeRouter = express.Router();

//For node-cron scheduled scraping
scrapeRouter.get('/scrape', scrapeController);

//For Frontend (scrape if item not in database, or show history if it does)
scrapeRouter.post('/track', trackController);

scrapeRouter.get('/history', getUserProductsController);

scrapeRouter.get('/verify-link', verifyLinkController);