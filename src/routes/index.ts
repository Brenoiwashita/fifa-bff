import { Router } from 'express';
import { getCareer, getDashboard, getHistory, getPlayers, listCareers, publishSnapshot } from '../controllers/career.controller';
import { syncAuth } from '../middlewares/sync-auth';

export const apiRouter = Router();

apiRouter.get('/careers', listCareers);
apiRouter.get('/careers/:careerId', getCareer);
apiRouter.get('/careers/:careerId/dashboard', getDashboard);
apiRouter.get('/careers/:careerId/players', getPlayers);
apiRouter.get('/careers/:careerId/history', getHistory);

// Endpoint usado pelo Electron para publicar o estado atual da carreira.
apiRouter.post('/sync/snapshots', syncAuth, publishSnapshot);
