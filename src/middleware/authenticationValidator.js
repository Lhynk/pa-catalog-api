const crypto = require('../helpers/crypto')

function tokenValidator(req, res, next) {
  const { auth } = req.cookies;

  if (!auth) {
    return res.status(401).json({ msg: 'Not authenticated' })
  }

  req.token = crypto.decrypt(auth);
  next();
}

module.exports = tokenValidator
