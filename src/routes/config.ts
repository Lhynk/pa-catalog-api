import { Express } from 'express';

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
};

export const RouterConfig = {
  setupRouters,
};
