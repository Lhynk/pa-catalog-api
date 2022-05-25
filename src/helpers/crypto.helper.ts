import * as CryptoES from 'crypto-js';

import ENV from '../env';

const Crypto = {
  encrypt: (value: string) => CryptoES.AES.encrypt(value, ENV.SECRET).toString(),
  decrypt: (value: string) => CryptoES.AES.decrypt(value, ENV.SECRET).toString(CryptoES.enc.Utf8),
};

export default Crypto;
