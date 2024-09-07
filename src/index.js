import dotenv from 'dotenv';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { startServer } from './server.js';
import { initMongoDB } from './db/initMongoConnection.js';

dotenv.config();

console.log('MONGODB_USER:', process.env.MONGODB_USER);
console.log('PORT:', process.env.PORT);

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world!',
  });
});

app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'Not found',
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
});

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);

app.use(cors());

startServer();

const bootstrap = async () => {
  await initMongoDB();
  startServer();
};

bootstrap();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
