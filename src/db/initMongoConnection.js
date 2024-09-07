import mongoose from 'mongoose';
import { env } from '../utils/env.js';

export async function initMongoDB() {
  const user = env('MONGODB_USER');
  const password = env('MONGODB_PASSWORD');
  const url = env('MONGODB_URL');
  const db = env('MONGODB_DB');

  if (!user || !password || !url || !db) {
    throw new Error(
      'Missing one or more environment variables for MongoDB connection',
    );
  }

  const uri = `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
