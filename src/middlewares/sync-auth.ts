import { NextFunction, Request, Response } from 'express';
import { env } from '../config/env';

export function syncAuth(req: Request, res: Response, next: NextFunction) {
  const key = req.header('x-sync-key');
  if (key !== env.SYNC_API_KEY) {
    return res.status(401).json({ error: 'INVALID_SYNC_KEY' });
  }
  next();
}
