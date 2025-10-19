import express from 'express';
import { scrapeRouter } from './routes/scrapeRouter';
import { userRouter } from './routes/userRouter';
import cors from 'cors';
import type { Request, Response } from 'express';

import { startPriceScraping } from './jobs/startPriceScraping';

const PORT = 8000;

const app = express();

app.use(cors());
app.use(express.json());


startPriceScraping(); // start scraping when server runs

app.get('/', (req: Request, res: Response) => {
    res.json({message: 'Hello World'});
});

app.use('/api', scrapeRouter);
app.use('/api', userRouter); 

app.use((req: Request, res: Response) => {
    res.status(404).json({error: 'Endpoint not found'});
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));