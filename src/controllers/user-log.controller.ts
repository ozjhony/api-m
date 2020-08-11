import {repository} from '@loopback/repository';
import {HttpErrors, post, requestBody} from '@loopback/rest';
import {SmsNotification} from '../models';
import {EmailNotification} from '../models/email-notification.model';
import {UsuarioRepository} from '../repositories';
import {UserlogRepository} from '../repositories/userlog.repository';
import {AuthService} from '../service/auth.services';
import {NotificationService} from '../service/notification.service';
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
    let randomPassword = await this.authService.ResetPassword(passwordResetData.username);
    console.log(randomPassword);
    if (randomPassword) {
      //send sms
      //envio de cualquier cosa
      let Usuario = await this.usuarioRepository.findOne({where: {id: passwordResetData.username}})
      switch (passwordResetData.type) {
        case 1:
          if (Usuario) {
            let notification = new SmsNotification({
              body: `Su nueva contraseña es: ${randomPassword}`,
              to: Usuario.celular
            });
            let sms = await new NotificationService().SmsNotification(notification);
            if (sms) {
              console.log("sms message sent");
              return true;
            }
            throw new HttpErrors[400]("Phone is not found");
          }
          throw new HttpErrors[400]("user not found");

          break;
        case 2:
          //send mail
          if (Usuario) {
            let notification = new EmailNotification({
              textBody: `Su nueva contraseña es: ${randomPassword}`,
              htmlBody: `Su nueva contraseña es: ${randomPassword}`,
              to: Usuario.email,
              subject: 'Nueva contraseña'
            });
            let mail = await new NotificationService().MailNotification(notification);
            if (mail) {
              console.log("mail message sent");
              return true
            }
            throw new HttpErrors[400]("Email is not found");
          }
          throw new HttpErrors[400]("User not found");
          break;

        default:
          throw new HttpErrors[400]("this notification type is not supported.");
          break;
      }
    }
    throw new HttpErrors[400]("user not found");
  }
}
