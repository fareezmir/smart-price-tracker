import express from 'express'

import { scrapeController } from '../controllers/scrapeController'

export const scrapeRouter = express.Router()

scrapeRouter.get('/scrape', scrapeController)
