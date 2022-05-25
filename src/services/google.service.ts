import { google } from 'googleapis';

import ENV from '../env';

const googleAuth = new google.auth.OAuth2({
  clientId: ENV.CREDENTIALS.CLIENT_ID,
  clientSecret: ENV.CREDENTIALS.CLIENT_SECRET,
  redirectUri: ENV.CREDENTIALS.REDIRECT_URI,
});

const driveGoogle = google.drive({ version: 'v2', auth: googleAuth });

const GoogleService = {
  auth: {
    getChallengeUrl: () =>
      googleAuth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: ENV.CREDENTIALS.SCOPE,
      }),
    setCredentials: (token: string) =>
      googleAuth.setCredentials({
        refresh_token: token,
      }),
    getToken: async (code: string) => googleAuth.getToken(code),
  },

  drive: {
    getFilesFromFolder: async () => {
      try {
        const { data } = await driveGoogle.files.list({ q: `"${ENV.FOLDER_ID ?? ''}" in parents` });

        if (data == null || data.items == null) {
          return [];
        }

        return data.items.map((i) => ({
          id: i.id,
          title: i.title,
          preview: i.embedLink,
          thumbnail: i.thumbnailLink,
          download: i.webContentLink,
        }));
      } catch (error: any) {
        const err = {
          code: error.code ?? 500,
          message: error.errors?.[0].message ?? 'Error getting files from folder',
        };
        throw err;
      }
    },
  },
};

export default GoogleService;
