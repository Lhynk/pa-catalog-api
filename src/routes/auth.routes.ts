import express from 'express';

import AuthController from '../controller/auth.controller';

const AuthRouter = express.Router();

AuthRouter.get('/signin', AuthController.siginUser);
AuthRouter.get('/code/:code?', AuthController.authenticateUser);

export default AuthRouter;
