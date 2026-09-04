import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { env } from './config/env';
import { errorHandler } from './middlewares/error-handler';
import { apiRouter } from './routes';

export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      const allowed = env.CORS_ORIGIN.split(',').map((item) => item.trim());
      if (allowed.includes('*') || allowed.includes(origin)) return callback(null, true);
      return callback(new Error('CORS_NOT_ALLOWED'));
    },
  }));
  app.use(express.json({ limit: '25mb' }));
  app.use(morgan('dev'));

  app.get('/health', (_req, res) => {
    const mongoReady = mongoose.connection.readyState === 1;
    res.status(mongoReady ? 200 : 503).json({
      ok: mongoReady,
      service: 'fc-career-hub-api',
      dataSource: 'mongo',
      mongo: mongoReady ? 'connected' : 'disconnected',
    });
  });

  app.use('/api', apiRouter);
  app.use(errorHandler);
  return app;
}
