import {serviceKeys as keys} from '../keys/service-keys';
const CryptoJS = require("crypto-js");

export class EncryptDecrypt {
  type: string;
  constructor(type: string) {
    this.type = type;
  }

  Encrypt(text: string) {
    switch (this.type) {
      case keys.MD5:
        return CryptoJS.MD5(text).toString();
        break;
      case keys.AES:
        return CryptoJS.AES.encrypt(text, 'secretkey').toString();

        break;
      case keys.SHA_512:

        break;
      default:
        return "this type no is supported"
        break;
    }

  }
}
