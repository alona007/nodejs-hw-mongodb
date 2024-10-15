import createHttpError from 'http-errors';
<<<<<<< Updated upstream

=======
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';
>>>>>>> Stashed changes
import { SWAGGER_PATH } from '../constants/index.js';

export const swaggerDocuments = (req, res, next) => {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    swaggerUI.setup(swaggerDoc)(req, res, next);
  } catch {
    next(createHttpError(500, "Can't load swagger docs"));
  }
};

export const swaggerDocs = [swaggerUI.serve, swaggerDocuments];
