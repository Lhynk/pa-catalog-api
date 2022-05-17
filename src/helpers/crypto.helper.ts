import cryptoJs from 'crypto-js';

import { ENV } from '../env';

const encrypt: (value: string) => string = (value: string) => cryptoJs.AES.encrypt(value, ENV.SECRET).toString();
const decrypt: (value: string) => string = (value: string) => cryptoJs.AES.decrypt(value, ENV.SECRET).toString(cryptoJs.enc.Utf8);

export const Crypto = {
  encrypt,
  decrypt,
};
