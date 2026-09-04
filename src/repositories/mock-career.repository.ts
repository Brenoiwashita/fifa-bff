import { mockData } from '../mocks/app.mock';
import { CareerRepository } from './career.repository';
import { CareerSnapshot } from '../types/domain';

const store = new Map<string, CareerSnapshot[]>();

function defaultSnapshot(careerId: string): CareerSnapshot | null {
  const career = mockData.careers.find((item) => item.id === careerId);
  if (!career) return null;

  return {
    careerId,
    generatedAt: new Date().toISOString(),
    version: mockData.app.databaseVersion,
    career,
    players: mockData.players,
    standings: mockData.standings,
    topScorers: mockData.topScorers,
    topAssists: mockData.topAssists,
    metadata: { source: 'mock' },
  };
}

export class MockCareerRepository implements CareerRepository {
  async listCareers(): Promise<CareerSnapshot[]> {
    return mockData.careers
      .map((career) => this.latestSync(career.id) ?? defaultSnapshot(career.id))
      .filter((item): item is CareerSnapshot => Boolean(item));
  }

  async getLatest(careerId: string): Promise<CareerSnapshot | null> {
    return this.latestSync(careerId) ?? defaultSnapshot(careerId);
  }

  async saveSnapshot(snapshot: CareerSnapshot): Promise<CareerSnapshot> {
    const history = store.get(snapshot.careerId) ?? [];
    history.unshift(snapshot);
    store.set(snapshot.careerId, history);
    return snapshot;
  }

  async getHistory(careerId: string, limit = 20): Promise<CareerSnapshot[]> {
    const current = store.get(careerId) ?? [];
    if (current.length) return current.slice(0, limit);
    const initial = defaultSnapshot(careerId);
    return initial ? [initial] : [];
  }

  private latestSync(careerId: string): CareerSnapshot | null {
    return store.get(careerId)?.[0] ?? null;
  }
}
