import { Router, Request, Response } from 'express';
import { isPostgresConnected } from '../db/index.js';

export const healthRouter = Router();

healthRouter.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: isPostgresConnected() ? 'postgresql_connected' : 'local_storage_ready',
    service: 'Varnit Tyagi Portfolio API',
  });
});
