import { Request, Response } from 'express';
import { z } from 'zod';
import { careerService } from '../services/container';

type CareerParams = { careerId: string };

const playerSchema = z.object({
  id: z.number(),
  name: z.string(),
  team: z.string(),
  pos: z.string(),
  age: z.number(),
  ovr: z.number(),
  pot: z.number(),
  games: z.number(),
  starts: z.number().optional(),
  goals: z.number(),
  assists: z.number(),
  minutes: z.number().optional(),
  yellowCards: z.number().optional(),
  redCards: z.number().optional(),
  cleanSheets: z.number().optional(),
  averageRating: z.number().optional(),
  value: z.string(),
});

const snapshotSchema = z.object({
  careerId: z.string().min(1),
  generatedAt: z.string().datetime(),
  version: z.string().min(1),
  career: z.object({
    id: z.string(),
    club: z.string(),
    season: z.string(),
    games: z.number(),
    manager: z.string().optional(),
    lastModified: z.string(),
    syncStatus: z.enum(['synced', 'pending']),
  }),
  players: z.array(playerSchema),
  standings: z.array(z.object({
    position: z.number(),
    club: z.string(),
    games: z.number(),
    points: z.number(),
    active: z.boolean().optional(),
  })),
  topScorers: z.array(z.object({ name: z.string(), value: z.number() })),
  topAssists: z.array(z.object({ name: z.string(), value: z.number() })),
  metadata: z.record(z.unknown()).optional(),
});

export async function listCareers(_req: Request, res: Response) {
  const careers = await careerService.listCareers();
  return res.json(careers.map((item) => ({
    ...item.career,
    version: item.version,
    generatedAt: item.generatedAt,
  })));
}

export async function getCareer(req: Request<CareerParams>, res: Response) {
  const result = await careerService.getCareer(req.params.careerId);
  if (!result) return res.status(404).json({ error: 'CAREER_NOT_FOUND' });
  return res.json(result);
}

export async function getPlayers(req: Request<CareerParams>, res: Response) {
  const players = await careerService.getPlayers(req.params.careerId);
  if (!players) return res.status(404).json({ error: 'CAREER_NOT_FOUND' });
  return res.json(players);
}

export async function getDashboard(req: Request<CareerParams>, res: Response) {
  const dashboard = await careerService.getDashboard(req.params.careerId);
  if (!dashboard) return res.status(404).json({ error: 'CAREER_NOT_FOUND' });
  return res.json(dashboard);
}

export async function publishSnapshot(req: Request, res: Response) {
  const parsed = snapshotSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'INVALID_SNAPSHOT', details: parsed.error.flatten() });
  }

  const saved = await careerService.publish(parsed.data);
  return res.status(201).json({
    ok: true,
    careerId: saved.careerId,
    version: saved.version,
    generatedAt: saved.generatedAt,
    counts: { players: saved.players.length, standings: saved.standings.length },
  });
}

export async function getHistory(req: Request<CareerParams>, res: Response) {
  const rawLimit = Array.isArray(req.query.limit) ? req.query.limit[0] : req.query.limit;
  const limit = Math.min(Math.max(Number(rawLimit) || 20, 1), 100);
  const history = await careerService.history(req.params.careerId, limit);
  return res.json(history.map((item) => ({
    careerId: item.careerId,
    version: item.version,
    generatedAt: item.generatedAt,
    players: item.players.length,
    standings: item.standings.length,
    metadata: item.metadata,
  })));
}
