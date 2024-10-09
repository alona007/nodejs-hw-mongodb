import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoDB.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
import createDirIfNoteExists from './utils/createDirIfNoteExists.js';

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
  await createDirIfNoteExists(TEMP_UPLOAD_DIR);
  await createDirIfNoteExists(UPLOAD_DIR);
};
bootstrap();
