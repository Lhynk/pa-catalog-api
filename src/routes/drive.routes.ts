import express from 'express';

import DriveController from '../controller/drive.controller';

const DriveRouter = express.Router();

DriveRouter.get('/', DriveController.getFiles);

export default DriveRouter;
