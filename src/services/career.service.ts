import { CareerRepository } from '../repositories/career.repository';
import { CareerSnapshot } from '../types/domain';

export class CareerService {
  constructor(private readonly repository: CareerRepository) {}

  listCareers() {
    return this.repository.listCareers();
  }

  async getCareer(careerId: string) {
    return this.repository.getLatest(careerId);
  }

  async getPlayers(careerId: string) {
    const snapshot = await this.repository.getLatest(careerId);
    return snapshot?.players ?? null;
  }

  async getDashboard(careerId: string) {
    const snapshot = await this.repository.getLatest(careerId);
    if (!snapshot) return null;

    const players = snapshot.players;
    const averageOverall = players.length
      ? Number((players.reduce((acc, player) => acc + player.ovr, 0) / players.length).toFixed(1))
      : 0;
    const averageAge = players.length
      ? Number((players.reduce((acc, player) => acc + player.age, 0) / players.length).toFixed(1))
      : 0;

    return {
      career: snapshot.career,
      version: snapshot.version,
      generatedAt: snapshot.generatedAt,
      squadSummary: {
        players: players.length,
        averageOverall,
        averageAge,
      },
      standings: snapshot.standings,
      topScorers: snapshot.topScorers,
      topAssists: snapshot.topAssists,
    };
  }

  publish(snapshot: CareerSnapshot) {
    return this.repository.saveSnapshot(snapshot);
  }

  history(careerId: string, limit: number) {
    return this.repository.getHistory(careerId, limit);
  }
}
