import express from 'express';

import { scrapeController } from '../controllers/product/scrapeController';
import { verifyLinkController } from '../controllers/product/verifyLinkController';
import { trackController } from '../controllers/product/trackController';

export const scrapeRouter = express.Router();

//For node-cron scheduled scraping
scrapeRouter.get('/scrape', scrapeController);

//For Frontend (scrape if item not in database, or show history if it does)
scrapeRouter.post('/track', trackController);

scrapeRouter.get('/verify-link', verifyLinkController);