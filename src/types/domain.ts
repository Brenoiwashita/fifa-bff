export interface Player {
  id: number;
  name: string;
  team: string;
  pos: string;
  age: number;
  ovr: number;
  pot: number;
  games: number;
  starts?: number;
  goals: number;
  assists: number;
  minutes?: number;
  yellowCards?: number;
  redCards?: number;
  cleanSheets?: number;
  averageRating?: number;
  value: string;
}

export interface Career {
  id: string;
  club: string;
  season: string;
  games: number;
  manager?: string;
  lastModified: string;
  syncStatus: 'synced' | 'pending';
}

export interface Standing {
  position: number;
  club: string;
  games: number;
  points: number;
  active?: boolean;
}

export interface Ranking {
  name: string;
  value: number;
}

export interface CareerSnapshot {
  careerId: string;
  generatedAt: string;
  version: string;
  career: Career;
  players: Player[];
  standings: Standing[];
  topScorers: Ranking[];
  topAssists: Ranking[];
  metadata?: Record<string, unknown>;
}
