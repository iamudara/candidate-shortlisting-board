import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './data/prisma-client';
import { candidateRouter } from './presentation/routes/candidate.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
// prisma instance is now imported to verify connection if needed, though lazy connection handling is typical.

app.use(cors());
app.use(express.json());

app.use('/api/candidates', candidateRouter);

// Health Check
app.get('/', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
