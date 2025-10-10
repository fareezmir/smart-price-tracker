import express from 'express';

import { scrapeController } from '../controllers/scrapeController';
import { getPriceHistoryController } from '../controllers/getPriceHistoryController';
import { verifyLinkController } from '../controllers/verifyLinkController';

export const scrapeRouter = express.Router();

scrapeRouter.get('/scrape', scrapeController);

scrapeRouter.get('/history', getPriceHistoryController);

scrapeRouter.get('/verify-link', verifyLinkController);