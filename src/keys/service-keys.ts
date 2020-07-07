export namespace serviceKeys {
  export const MD5 = 'md5';
  export const AES = 'aes';
  export const SHA_512 = 'sha512';
  export const AES_SECRECT_KEY = 'AES@SecrectKey*';
  export const LOGIN_CRYPT_METHOD = MD5;
  export const TOKEN_EXPIRATION_TIME = Math.floor(Date.now() / 1000) * 3600;
  export const JWT_SECRET_KEY = 'JWT@SecretKey*';

}
