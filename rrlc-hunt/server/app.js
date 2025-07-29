import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

import classRoutes from './routes/classRoutes.js';
import scanRoutes from './routes/scanRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/classes', classRoutes);
app.use('/api/scans', scanRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅  Mongo connected'))
  .catch(console.error);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on :${PORT}`));