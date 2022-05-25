import { Express } from 'express';

import AuthRouter from './auth.routes';
import DriveRouter from './drive.routes';

/**
 * Router configuration
 *
 * api/auth => Everything related with authtenticating the user
 *
 * api/files => Everything related with accessing and manipulating google drive (required auth token)
 * @param {Express} app
 */
const setupRouters = (app: Express): void => {
  app.get('/healthcheck', (_req, res) => res.sendStatus(200));

  app.use('/api/auth', AuthRouter);
  app.use('/api/files', DriveRouter);
};

export default setupRouters;
