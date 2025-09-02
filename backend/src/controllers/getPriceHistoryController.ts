import type {Request, Response} from 'express'
import type {PriceHistory} from '../types'
import { NeweggScraper } from '../scrapers/NeweggScraper'
import {URL} from 'url'


export const getPriceHistoryController = async (req:Request, res: Response): Promise<void> => {
    try {
        const productURL = req.query.url

        if (!productURL || typeof productURL !== 'string') {
            res.status(400).json({error: 'Missing ProductURL or URL invalid'})
            return
        }

        const parsedURL: URL = new URL(productURL)
        const productId: string | null = parsedURL.searchParams.get('Item')
        
        if (!productId) {
            res.status(400).json({error: 'Missing Item ID in Product URL'})
            return
        }

        const newEggScraper: NeweggScraper = new NeweggScraper() 
        
        const productHistory: PriceHistory = await newEggScraper.getProductHistory(productId) 
        res.json(productHistory)

    }catch(err) {
        console.log(err)
        res.status(404).json({error: "No history file exists."})
    }
}