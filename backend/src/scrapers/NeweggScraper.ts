import {PriceHistory, PricePoint, Product} from '../types'
import { ScraperInterface } from '../interfaces/ScraperInterface'
import axios from 'axios'
import * as cheerio from 'cheerio'
import fs from 'fs/promises'

export class NeweggScraper implements ScraperInterface {

    async scrapeProduct(url:string):Promise<Product> {

        try {
            const response = await axios.get(url)
            const html = response.data //html string of the website

            const $ =  cheerio.load(html)

            const title:string = $('h1.product-title').text()
            const priceText:string = $('div.price-current').text().trim()
            const price:number = parseFloat(priceText.replace(/[^0-9.]/g, ''))

            if (!title || isNaN(price)) {
                throw new Error('Price or Title could not be found.')
            }

            return {title: title, price: price, currency:"CAD"} 

        }catch(err){
            console.log(err)
            throw new Error('Failed to scrape product.')
        }
        

    }

    async getProductHistory(productId:string):Promise<PriceHistory> {
        try {
            const filePath:string = `data/history/${productId}.json`
            const data:string = await fs.readFile(filePath, 'utf8')
            
            return JSON.parse(data)
        } catch (err) {
            return [] //File doesn't exist yet, so create empty history
        }
    }

    async savePricePoint(productId:string, newPrice:number):Promise<void> {
        try {
            const filePath:string = `data/history/${productId}.json`
            const history:PriceHistory = await this.getProductHistory(productId)

            const newPricePoint:PricePoint = {price: newPrice, timestamp: new Date().toISOString()}
            history.push(newPricePoint) //push the new point

            await fs.writeFile(filePath, JSON.stringify(history, null, 2))

        }catch(err){
            console.log(err)
            //throw new Error('Could not save price point')
            throw err
        }
    }

    getRetailerName():string {
        return 'NewEgg'
    }

}