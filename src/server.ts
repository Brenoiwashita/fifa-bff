import mongoose from 'mongoose';
import { createApp } from './app';
import { env } from './config/env';

async function bootstrap() {
  await mongoose.connect(env.MONGODB_URI);

  console.log('MongoDB connected');

  const app = createApp();

  app.listen(env.PORT, () => {
    console.log(`FC Career Hub API: http://localhost:${env.PORT}`);
    console.log('Data source: MongoDB');
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start API', error);
  process.exit(1);
});