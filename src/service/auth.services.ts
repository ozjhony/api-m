import {repository} from '@loopback/repository';
import {generate as generator} from 'generate-password';
import {PasswordKeys as passKeys} from '../keys/password-keys';
import {serviceKeys as keys} from '../keys/service-keys';
import {Userlog} from '../models';
import {UserlogRepository} from '../repositories';
import {EncryptDecrypt} from './ecryptdescrypt.service';
const jwt = require("jsonwebtoken");

export class AuthService {
  constructor(
    @repository(UserlogRepository)
    public userlogRepository: UserlogRepository
  ) {

  }

  /**
     *
     * @param username
     * @param password
     */
  async Identify(username: string, password: string): Promise<Userlog | false> {
    let user = await this.userlogRepository.findOne({where: {username: username}});
    if (user) {
      let cryptPass = new EncryptDecrypt(keys.LOGIN_CRYPT_METHOD).Encrypt(password);
      if (user.password == cryptPass) {
        return user;
      }
    }
    return false;

  }

  /**
    *
    * @param user
    */
  async GenerateToken(user: Userlog) {
    user.password = '';
    let token = jwt.sign({
      exp: keys.TOKEN_EXPIRATION_TIME,
      data: {
        _id: user.id,
        username: user.username,
        role: user.role,
        paternId: user.usuarioId
      }
    },
      keys.JWT_SECRET_KEY);
    return token;
  }

  async verifyToken(token: string) {
    try {
      let data = jwt.verify(token, keys.JWT_SECRET_KEY);
      return data;
    }
    catch (error) {
      return false;
    }
  }



  /**
  * Reset the user password when it is missed
  * @param username
  */
  async ResetPassword(username: string): Promise<string | false> {
    let user = await this.userlogRepository.findOne({where: {username: username}});
    if (user) {
      let randomPassword = generator({
        length: passKeys.LENGTH,
        numbers: passKeys.NUMBERS,
        lowercase: passKeys.LOWERCASE,
        uppercase: passKeys.UPPERCASE
      });
      let crypter = new EncryptDecrypt(keys.LOGIN_CRYPT_METHOD);
      let password = crypter.Encrypt(crypter.Encrypt(randomPassword));
      user.password = password;
      this.userlogRepository.replaceById(user.id, user);
      return randomPassword;
    }
    return false;
  }

}
