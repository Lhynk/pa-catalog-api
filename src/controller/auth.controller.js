const { GOOGLE } = require('../helpers/google');
const crypto = require('../helpers/crypto');

/**
 * Validates if the user has a session valid
 * @param {Request} req Express Request
 * @param {Response} res Express Response
 * @returns
 * Valid session -> ALLOW status
 *
 * Invalid session -> Auth url and CHALLENGE status
 */
function signinUser(req, res) {
  const authSession = req.cookies.auth;

  if (authSession) {
    setCredentials(crypto.decrypt(authSession), res);
    return res.json({ status: 1, msg: 'User Authenticated' });
  }

  const authUrl = GOOGLE.AUTH.getChanllengeUrl();
  console.log(authUrl);

  return res.status(200).redirect(authUrl);
}

async function authenticateUser(req, res) {
  const code = req.query.code;

  if (!code) {
    return res
      .status(408)
      .json({ message: 'Authorization code was not provided' });
  }

  try {
    const { tokens } = await GOOGLE.AUTH.getToken(code);

    setCredentials(tokens.refresh_token, res);

    return res.json({ status: 1, message: 'User Authenticated' });
  } catch (e) {
    console.log(e);
  }
}

/**
 * Authenticate user and creates auth & session cookies
 * @param {string} token Auth session token
 * @param {Response} res Express response
 */
function setCredentials(token, res) {
  try {
    GOOGLE.AUTH.setCredentials(token);

    // Add auth cookie with expiration date of 1 week
    res.cookie('auth', crypto.encrypt(token), {
      maxAge: 604800000,
    });

    // Add session cookie with expiration of Session
    res.cookie('session', new Date().getUTCMilliseconds());
  } catch (err) {}
}

module.exports = {
  signinUser,
  authenticateUser,
};
