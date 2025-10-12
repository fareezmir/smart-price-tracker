import { ScraperInterface } from '../interfaces/ScraperInterface';
import { NeweggScraper } from '../scrapers/NeweggScraper';

const SCRAPER_REGISTRY: Record <string, {
    createScraper: () => ScraperInterface,
    extractProductId: (url: string) => string;
}> = {
    'newegg': {
        createScraper: () => new NeweggScraper(),
        extractProductId: (url: string) => {
            const urlObj = new URL(url);
            
            // Try /p/ format first
            const pathMatch = urlObj.pathname.match(/\/p\/([^\/\?]+)/);
            if (pathMatch) {
              return pathMatch[1];
            }
            
            // Fallback to ?Item= format 
            return urlObj.searchParams.get('Item') || '';
          }
    },
    
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

