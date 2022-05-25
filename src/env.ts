const ENV = {
  APP_URI: process.env.APP_URI ?? '',
  SECRET: process.env.AUTH_COOKIE ?? '',
  PORT: process.env.PORT ?? 3001,
  CREDENTIALS: {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REDIRECT_URI: process.env.REDIRECT_URI,
    SCOPE: process.env.SCOPE,
  },
  FOLDER_ID: process.env.FOLDER_ID ?? '',
};

export default ENV;
