# FC Career Hub - Back/API

Projeto independente Node.js + Express + TypeScript + MongoDB/Mongoose.

## Configuração

```bash
npm install
cp .env.example .env
```

Preencha `MONGODB_URI` com seu cluster e defina uma `SYNC_API_KEY`.

## Desenvolvimento

```bash
npm run dev
```

## Produção

```bash
npm run build
npm start
```

A API usa a porta 3333 por padrão e serve como fonte oficial para o Angular/Electron após a sincronização do save.
