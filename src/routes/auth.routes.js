const express = require('express');
const authController = require('../controller/auth.controller')

const authRouter = express.Router();

authRouter.get('/signin', authController.signinUser)
authRouter.get('/code/:code?', authController.authenticateUser)

module.exports = authRouter;
