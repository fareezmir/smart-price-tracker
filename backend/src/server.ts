import express from 'express';
import { scrapeRouter } from './routes/scrapeRouter';
import cors from 'cors';

import type { Request, Response } from 'express';

const PORT = 8000;

const app = express();

app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.json({message: 'Hello World'});
});

app.use('/api', scrapeRouter);

app.use((req: Request, res: Response) => {
    res.status(404).json({error: 'Endpoint not found'});
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));