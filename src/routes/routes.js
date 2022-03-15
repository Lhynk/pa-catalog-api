const authRouter = require('./auth.routes')
const tokenValidator = require('../middleware/authenticationValidator')

/**
 * Routes Handler
 * 
 * api/auth => Everything related with authtenticating the user
 * 
 * api/drive => Everything related with accessing and manipulating google drive (required auth token)
 * @param {Express} app 
 */
function routes(app) {
  app.get('/healthcheck', (_req, res) => res.sendStatus(200));

  app.use('/api/auth', authRouter);

  app.all('/api/drive', tokenValidator);
  app.use('/api/drive', (req, res) => {
    console.log(req.token)
    return res.sendStatus(200)
  });
}

module.exports = routes;
