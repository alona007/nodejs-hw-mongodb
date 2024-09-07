import dotenv from 'dotenv';
import { initMongoDB } from './db/initMongoConnection.js';
import { startServer } from './server.js';

dotenv.config();

const bootstrap = async () => {
  try {
    await initMongoDB();
    startServer();
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
};

bootstrap();
