import mongoose from 'mongoose';
import { createApp } from '../src/app';
import { env } from '../src/config/env';

const app = createApp();

let connectionPromise: Promise<typeof mongoose> | null = null;

function connectMongo() {
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve(mongoose);
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(env.MONGODB_URI)
      .catch((error) => {
        connectionPromise = null;
        throw error;
      });
  }

  return connectionPromise;
}

export default async function handler(req: any, res: any) {
  try {
    await connectMongo();

    return app(req, res);
  } catch (error) {
    console.error('MongoDB connection error:', error);

    return res.status(500).json({
      ok: false,
      error: 'Failed to connect to MongoDB',
    });
  }
}