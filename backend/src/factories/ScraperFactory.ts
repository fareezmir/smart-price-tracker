import { ScraperInterface } from '../interfaces/ScraperInterface';
import { NeweggScraper } from '../scrapers/NeweggScraper';
import { AmazonScraper } from '../scrapers/AmazonScraper';


// Function used to find the product ID from the url of Newegg links
const extractNeweggId = (url: string) => {
    const urlObj = new URL(url);
    const pathMatch = urlObj.pathname.match(/\/p\/([^\/\?]+)/);
    if (pathMatch) {
        return pathMatch[1];
    }
    return urlObj.searchParams.get('Item') || '';
};

const extractAmazonId = (url: string) => {
    const urlObj = new URL(url);
    const dpMatch = urlObj.pathname.match(/\/dp\/([A-Z0-9]{10})/);
    return dpMatch ? dpMatch[1] : '';
};


const SCRAPER_REGISTRY: Record <string, {
    createScraper: () => ScraperInterface,
    extractProductId: (url: string) => string;
}> = {
    'newegg': {
        createScraper: () => new NeweggScraper(),
        extractProductId: extractNeweggId
    },
    'amazon': {
        createScraper: () => new AmazonScraper(),
        extractProductId: extractAmazonId
    }
};

export class ScraperFactory {
    static getScraper(url: string): ScraperInterface {
        const domain = new URL(url).hostname; // method already lowercases by default

        const available_scraper = Object.keys(SCRAPER_REGISTRY).find(key => domain.includes(key));

        if (available_scraper) {
            return SCRAPER_REGISTRY[available_scraper].createScraper();
        }

        throw new Error(`Unsupported retailer ${domain}`);
    }

    static extractProductId(url: string): string {
        const domain = new URL(url).hostname; 
        const available_scraper = Object.keys(SCRAPER_REGISTRY).find(key => domain.includes(key));

        if (available_scraper) {
            return SCRAPER_REGISTRY[available_scraper].extractProductId(url);
        }

        throw new Error(`Cannot extract product ID from unsupported retailer ${domain}`);
    }
}

