import type {Request, Response} from 'express'
import fs from 'fs/promises'
import type {Product} from '../types.ts'

//Make sure that the obj is actually formatted as a Product (TypeScript type guard)
function isProduct(obj:any):obj is Product {
    return typeof obj.title === 'string'
     && typeof obj.price === 'number' 
     && typeof obj.currency === 'string'
}

//Controller for scraping
export const scrapeController = async (req:Request, res:Response) => {
    try{
        const data:string = await fs.readFile(('data/mock-product.json'), 'utf-8')
        const dataObj = JSON.parse(data)
        
        if (!isProduct(dataObj)) {
            res.status(500).json({error: "Invalid product format"})
            return
        }
        res.json(dataObj)
    }
    catch (err) {
        console.error('READ ERROR:', err)
        res.status(500).json({error: "Failed to load product data"})
    }
    
}