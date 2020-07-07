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
      let tk = this.authService.GenerateToken(user);
      return {
        data: user,
        token: tk
      }
    } else {
      throw new HttpErrors[401]("User or Password invalid.");
    }
  }





}
