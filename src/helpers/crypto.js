const cryptojs = require('crypto-js');
const { json } = require('express/lib/response');
const { SECRET } = require('../config/env')

module.exports = {
  encrypt: value => cryptojs.AES.encrypt(value, SECRET).toString(),
  decrypt: (value) => cryptojs.AES.decrypt(value, SECRET).toString(cryptojs.enc.Utf8)
}
