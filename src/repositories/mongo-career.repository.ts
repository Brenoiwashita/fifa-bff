import { CareerRepository } from './career.repository';
import { CareerSnapshot } from '../types/domain';
import { CareerSnapshotModel } from '../models/career-snapshot.model';

export class MongoCareerRepository implements CareerRepository {
  async listCareers(): Promise<CareerSnapshot[]> {
    const rows = await CareerSnapshotModel.aggregate([
      { $sort: { generatedAt: -1 } },
      { $group: { _id: '$careerId', doc: { $first: '$$ROOT' } } },
      { $replaceRoot: { newRoot: '$doc' } },
      { $sort: { generatedAt: -1 } },
    ]);
    return rows.map(normalize);
  }

  async getLatest(careerId: string): Promise<CareerSnapshot | null> {
    const row = await CareerSnapshotModel.findOne({ careerId }).sort({ generatedAt: -1 }).lean();
    return row ? normalize(row) : null;
  }

  async saveSnapshot(snapshot: CareerSnapshot): Promise<CareerSnapshot> {
    const row = await CareerSnapshotModel.create({ ...snapshot, generatedAt: new Date(snapshot.generatedAt) });
    return normalize(row.toObject());
  }

  async getHistory(careerId: string, limit = 20): Promise<CareerSnapshot[]> {
    const rows = await CareerSnapshotModel.find({ careerId }).sort({ generatedAt: -1 }).limit(limit).lean();
    return rows.map(normalize);
  }
}

function normalize(row: any): CareerSnapshot {
  return {
    careerId: row.careerId,
    generatedAt: new Date(row.generatedAt).toISOString(),
    version: row.version,
    career: row.career,
    players: row.players ?? [],
    standings: row.standings ?? [],
    topScorers: row.topScorers ?? [],
    topAssists: row.topAssists ?? [],
    metadata: row.metadata ?? {},
  };
}
