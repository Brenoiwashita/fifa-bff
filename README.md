# FC Career Hub API

API Node/Express/TypeScript com MongoDB obrigatório.

## Rodar

```bash
npm install
cp .env.example .env
npm run dev
```

Variáveis obrigatórias: `MONGODB_URI` e `SYNC_API_KEY`.

## Endpoints

- `GET /health`
- `GET /api/careers`
- `GET /api/careers/:careerId`
- `GET /api/careers/:careerId/dashboard`
- `GET /api/careers/:careerId/players`
- `GET /api/careers/:careerId/history`
- `POST /api/sync/snapshots` — exige `x-sync-key`

O backend é a fonte oficial de dados do Angular/Electron depois que um save é sincronizado.
