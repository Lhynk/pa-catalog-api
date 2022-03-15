const { google } = require('googleapis');
const { CREDENTIALS } = require('../config/env')

const googleAuth = new google.auth.OAuth2({
  clientId: CREDENTIALS.CLIENT_ID,
  clientSecret: CREDENTIALS.CLIENT_SECRET,
  redirectUri: CREDENTIALS.REDIRECT_URI,
});

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

module.exports = {
  GOOGLE: {
    AUTH
  }
}

