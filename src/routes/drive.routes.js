const express = require('express');
const driveController = require('../controller/drive.controller')

const driveRouter = express.Router();

driveRouter.get('/files', driveController.getFilesFromFolder)

module.exports = driveRouter;
