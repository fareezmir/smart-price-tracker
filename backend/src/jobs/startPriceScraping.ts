import cron from 'node-cron';
import { DatabaseProductRepository } from '../repositories/DatabaseProductRepository';
import { ScheduledScraper } from '../services/scheduledScraper';

export function startPriceScraping() {
    const productRepository = new DatabaseProductRepository();
    const scheduledScraper = new ScheduledScraper(productRepository);

    // Scrapes product data every hour
    cron.schedule('0 * * * *', async () => {
        console.log('Running scrape...');
        try {
            await scheduledScraper.scrapeAllProducts();
        } catch (err) {
            console.error('Scheduled scrape failed', err);
        }
    });
}