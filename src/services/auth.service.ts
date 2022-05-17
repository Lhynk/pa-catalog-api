import { Response } from 'express';

import { Crypto } from '../helpers/crypto.helper';
import { GoogleService } from './google.service';

const sigin = (authSession: string, response: Response) => {
  try {
    if (authSession) {
      setCredentials(Crypto.decrypt(authSession), response);
      return { status: 1, msg: 'User Authenticated' };
    }

    const authUrl = GoogleService.auth.getChallengeUrl();
    console.log(authUrl);

    return { status: 2, msg: 'User needs authentication', authUrl };
  } catch (error: any) {
    console.log(error);
    return { msg: error.message };
  }
};

const authentication = async (code: string, response: Response) => {
  try {
    if (!code) {
      return { message: 'Authorization code was not provided' };
    }

    const { tokens } = await GoogleService.auth.getToken(code);
    console.log(tokens);

    if (tokens.refresh_token) {
      setCredentials(Crypto.encrypt(tokens.refresh_token), response);
      return { status: 1, message: 'User Authenticated' };
    }

    return { message: 'Authorization code was not valid' };
  } catch (error: any) {
    console.log(error);
    return { msg: error.message };
  }
};

/**
 * Authenticate user and creates auth cookies
 * @param {string} token Auth session token
 * @param {Response} res Express response
 */
function setCredentials(token: string, res: Response) {
  try {
    GoogleService.auth.setCredentials(token);

    // Add auth cookie with expiration date of 1 week
    res.cookie('auth', Crypto.encrypt(token), {
      maxAge: 604800000,
    });
  } catch (err) {
    console.log(err);
  }
}

export const AuthService = {
  sigin,
  authentication,
};
