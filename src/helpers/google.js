const { google } = require('googleapis');
const { CREDENTIALS, FOLDER_ID } = require('../config/env')

const googleAuth = new google.auth.OAuth2({
  clientId: CREDENTIALS.CLIENT_ID,
  clientSecret: CREDENTIALS.CLIENT_SECRET,
  redirectUri: CREDENTIALS.REDIRECT_URI,
});

const drive = google.drive({ version: "v2", auth: googleAuth })

const AUTH = {
  /**
   * Get the auth url using the current credentials 
   * @returns Auth url from google
   */
  getChanllengeUrl: () => googleAuth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: CREDENTIALS.SCOPE
  }),
  /**
   * Authenticate the user to be able to make request to google
   * @param {string} token Token to be use to authenticated all the requests to google
   * @returns void
   */
  setCredentials: (token) => googleAuth.setCredentials({
    refresh_token: token
  }),
  getToken: async (code) => googleAuth.getToken(code)
}

const DRIVE = {
  /**
   * Get a list of files inside user's goolde drive folder using the folder id
   * @returns A list of files that are inside the folder requested
   */
  getFilesFromFolder: () => drive.files.list({
    q: `"${FOLDER_ID}" in parents`
  }).then((list) => {
    if (!list.data) {
      return []
    }

    return list.data.items.map(i => ({
      id: i.id,
      title: i.title,
      preview: i.embedLink,
      thumbnail: i.thumbnailLink,
      download: i.webContentLink
    }))
  })
}

module.exports = {
  GOOGLE: {
    AUTH,
    DRIVE
  }
}

