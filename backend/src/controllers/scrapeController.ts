import type {Request, Response} from 'express'
import fs from 'fs/promises'
import type {Product} from '../types'
import { NeweggScraper } from '../scrapers/newEggScraper'

//Make sure that the obj is actually formatted as a Product (TypeScript type guard)
function isProduct(obj:any):obj is Product {
    return typeof obj.title === 'string'
     && typeof obj.price === 'number' 
     && typeof obj.currency === 'string'
}

//Controller for scraping
export const scrapeController = async (req:Request, res:Response) => {
    try{
        const productURL = req.query.url
    
        if (!productURL || typeof productURL !== 'string') {
            return res.status(400).json({error: 'Missing ProductURL or URL invalid'})
        }

        const newEggScraper = new NeweggScraper()
        const productDataObj:Product = await newEggScraper.scrapeProduct(productURL)
        
        if (!isProduct(productDataObj)) {
            res.status(500).json({error: 'Invalid product format'})
            return
        }
        res.json(productDataObj)
    }
    catch (err) {
        console.error('READ ERROR:', err)
        res.status(500).json({error: 'Failed to load product data'})
    }
    
}