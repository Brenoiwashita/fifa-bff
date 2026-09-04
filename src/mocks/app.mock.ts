import { Career, Player, Ranking, Standing } from '../types/domain';

export const mockData = {
  app: {
    version: '0.1.0',
    game: 'EA SPORTS FC 26',
    databaseVersion: '2026.09.04.1',
  },
  careers: <Career[]>[
    { id: 'santos-career', club: 'Santos FC', season: '2027/28', games: 27, manager: 'Breno', lastModified: 'Hoje 14:28', syncStatus: 'synced' },
    { id: 'sunderland-career', club: 'Sunderland', season: '2029/30', games: 12, lastModified: '02/09/2026', syncStatus: 'pending' },
  ],
  players: <Player[]>[
    { id: 190871, name: 'Neymar Jr', team: 'Santos', pos: 'LW', age: 34, ovr: 87, pot: 87, games: 28, goals: 17, assists: 11, value: '€32M' },
    { id: 900001, name: 'João Pedro', team: 'Santos', pos: 'CAM', age: 19, ovr: 76, pot: 91, games: 19, goals: 6, assists: 8, value: '€18M' },
    { id: 231832, name: 'Yuri Alberto', team: 'Corinthians', pos: 'ST', age: 25, ovr: 79, pot: 81, games: 25, goals: 14, assists: 4, value: '€22M' },
    { id: 900002, name: 'Rodrigo Garro', team: 'Corinthians', pos: 'CAM', age: 28, ovr: 81, pot: 81, games: 24, goals: 7, assists: 10, value: '€24M' },
    { id: 900003, name: 'Hugo Souza', team: 'Corinthians', pos: 'GK', age: 27, ovr: 78, pot: 80, games: 27, goals: 0, assists: 0, value: '€13M' },
  ],
  standings: <Standing[]>[
    { position: 1, club: 'Palmeiras', games: 27, points: 61 },
    { position: 2, club: 'Santos', games: 27, points: 59, active: true },
    { position: 3, club: 'Flamengo', games: 27, points: 57 },
    { position: 4, club: 'Corinthians', games: 27, points: 51 },
  ],
  topScorers: <Ranking[]>[
    { name: 'Neymar Jr', value: 17 },
    { name: 'Yuri Alberto', value: 14 },
    { name: 'João Pedro', value: 9 },
  ],
  topAssists: <Ranking[]>[
    { name: 'Neymar Jr', value: 11 },
    { name: 'Rodrigo Garro', value: 10 },
    { name: 'João Pedro', value: 8 },
  ],
};
