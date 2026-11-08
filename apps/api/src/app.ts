import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { config } from './config.js';
import { healthRouter } from './routes/health.js';
import { contactRouter } from './routes/contact.js';
import { adminRouter } from './routes/admin.js';

export function createApp(): Express {
  const app = express();

  // Security headers via Helmet
  app.use(helmet());

  // CORS configuration
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true);
        if (config.allowedOrigins.includes(origin) || config.env === 'development') {
          return callback(null, true);
        }
        return callback(new Error('Blocked by CORS policy'));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // Body and cookie parsing
  app.use(express.json({ limit: '100kb' }));
  app.use(express.urlencoded({ extended: true, limit: '100kb' }));
  app.use(cookieParser());

  // API Routes
  app.use('/api/health', healthRouter);
  app.use('/api/contact', contactRouter);
  app.use('/api/admin', adminRouter);

  // 404 handler
  app.use('/api/*', (_req: Request, res: Response) => {
    res.status(404).json({ success: false, error: 'API route not found' });
  });

  return app;
}
