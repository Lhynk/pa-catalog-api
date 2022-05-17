import { Express } from 'express';

import AuthRouter from './auth.routes';

/**
 * Router configuration
 *
 * api/auth => Everything related with authtenticating the user
 *
 * api/drive => Everything related with accessing and manipulating google drive (required auth token)
 * @param {Express} app
 */
const setupRouters = (app: Express) => {
  app.get('/healthcheck', (_req, res) => res.sendStatus(200));

  app.use('/api/auth', AuthRouter);
};

export const RouterConfig = {
  setupRouters,
};
