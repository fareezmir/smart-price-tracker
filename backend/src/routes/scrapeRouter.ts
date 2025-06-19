import express from 'express'

import { scrapeController } from '../controllers/scrapeController'
import { getPriceHistoryController } from '../controllers/getPriceHistoryController'

export const scrapeRouter = express.Router()

scrapeRouter.get('/scrape', scrapeController)

scrapeRouter.get('/history', getPriceHistoryController)
