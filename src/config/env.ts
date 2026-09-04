import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  PORT: z.coerce.number().default(3333),
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  CORS_ORIGIN: z.string().default('http://127.0.0.1:4200,http://localhost:4200'),
  SYNC_API_KEY: z.string().min(8, 'SYNC_API_KEY must have at least 8 characters'),
});

export const env = schema.parse(process.env);
