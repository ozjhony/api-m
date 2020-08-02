import {repository} from '@loopback/repository';
import {HttpErrors, post, requestBody} from '@loopback/rest';
import {UsuarioRepository} from '../repositories';
import {UserlogRepository} from '../repositories/userlog.repository';
import {AuthService} from '../service/auth.services';
const jwt = require("jsonwebtoken");

class Credentials {
  username: string;
  password: string;
}


class PasswordResetData {
  username: string;
  type: number;
}




export class userlogControler {

  authService: AuthService;

  constructor(
    @repository(UserlogRepository)
    public userlogRepository: UserlogRepository,
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository
  ) {
    this.authService = new AuthService(this.userlogRepository);
  }


  @post('/login', {
    responses: {
      '200': {
        description: 'login for users'
      }
    }
  })
  async login(
    @requestBody() credentials: Credentials
  ): Promise<object> {
    let user = await this.authService.Identify(credentials.username, credentials.password);
    if (user) {
      let tk = await this.authService.GenerateToken(user);
      return {
        data: user,
        token: tk
      }
    } else {
      throw new HttpErrors[401]("User or Password invalid.");
    }
  }


  @post('/password-reset', {
    responses: {
      '200': {
        description: 'login for users'
      }
    }
  })
  async reset(
    @requestBody() passwordResetData: PasswordResetData
  ): Promise<boolean> {
    let randomPassword = await this.authService.ResetPassword(passwordResetData.username)

    if (randomPassword) {
      //send sms
      //envio de cualquier cosa
      switch (passwordResetData.type) {
        case 1:
          //send sms
          console.log("sending sms :" + randomPassword)
          return true;
          break;


        case 2:
          //send sms
          console.log("sending sms :" + randomPassword)
          return false;
          break;


        default:
          throw new HttpErrors[400]("this password is not supported");
          break;
      }
    }
    throw new HttpErrors[400]("user not found");
  }







}
