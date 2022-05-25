import { Request, Response } from 'express';

import AuthService from '../services/auth.service';

const AuthController = {
  siginUser: (req: Request, res: Response) => {
    try {
      const authSession = req.cookies?.auth;

      const result = AuthService.sigin(authSession, res);

      return res.json(result);
    } catch (error: any) {
      console.log(error);
      return res.status(error.code).json({ msg: error.message });
    }
  },
  authenticateUser: async (req: Request, res: Response) => {
    try {
      const code = decodeURIComponent(req.query.code as string);

      const result = await AuthService.authentication(code, res);

      return res.json(result);
    } catch (error: any) {
      console.log(error);
      return res.status(error.code).json({ msg: error.message });
    }
  },
};

export default AuthController;
