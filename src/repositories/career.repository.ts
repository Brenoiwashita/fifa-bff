import { CareerSnapshot } from '../types/domain';

export interface CareerRepository {
  listCareers(): Promise<CareerSnapshot[]>;
  getLatest(careerId: string): Promise<CareerSnapshot | null>;
  saveSnapshot(snapshot: CareerSnapshot): Promise<CareerSnapshot>;
  getHistory(careerId: string, limit?: number): Promise<CareerSnapshot[]>;
}
