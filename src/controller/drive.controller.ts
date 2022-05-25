import { Request, Response } from 'express';

import GoogleService from '../services/google.service';

const DriveController = {
  getFiles: async (_: Request, res: Response): Promise<any> => {
    try {
      const result = await GoogleService.drive.getFilesFromFolder();

      return res.json(result);
    } catch (error: any) {
      console.log(error);
      return res.status(error.code).json({ msg: error.message });
    }
  },
};

export default DriveController;
