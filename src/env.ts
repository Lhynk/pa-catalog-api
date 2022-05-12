const APP_URI = process.env.APP_URI;
const SECRET = process.env.AUTH_COOKIE;
const PORT = process.env.PORT || 3001;
const CREDENTIALS = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI,
  SCOPE: process.env.SCOPE,
};
const FOLDER_ID = process.env.FOLDER_ID;

export const ENV = {
  APP_URI,
  SECRET,
  PORT,
  CREDENTIALS,
  FOLDER_ID,
};
