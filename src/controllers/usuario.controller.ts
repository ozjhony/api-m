import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody
} from '@loopback/rest';
import {serviceKeys as keys} from '../keys/service-keys';
import {Usuario} from '../models';
import {UserlogRepository, UsuarioRepository} from '../repositories';
import {EncryptDecrypt} from '../service/ecryptdescrypt.service';

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @repository(UserlogRepository)
    public userlogRepository: UserlogRepository,
  ) {}

  @post('/usuario', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['id'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    let us = await this.usuarioRepository.create(usuario);
    let password1 = await new EncryptDecrypt(keys.MD5).Encrypt(us.celular);
    let password2 = new EncryptDecrypt(keys.MD5).Encrypt(password1);
    let ul = {
      username: us.celular,
      password: password2,
      role: 1,
      usuarioId: us.id
    };
    let user = await this.userlogRepository.create(ul);
    user.password = password1;
    us.userlog = user
    return us;
  }

  @get('/usuario/count', {
    responses: {
      '200': {
        description: 'Usuario model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuario', {
    responses: {
      '200': {
        description: 'Array of Usuario model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Usuario, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuario', {
    responses: {
      '200': {
        description: 'Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuario/{id}', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Usuario, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuario/{id}', {
    responses: {
      '204': {
        description: 'Usuario PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuario/{id}', {
    responses: {
      '204': {
        description: 'Usuario PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    let us = await this.userlogRepository.findOne({where: {usuarioId: usuario.id}})
    if (us) {
      us.username = usuario.celular;
      await this.userlogRepository.replaceById(us.id, us);
    }
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuario/{id}', {
    responses: {
      '204': {
        description: 'Usuario DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }
}


/*import {
  CountSchema,


  repository
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody
} from '@loopback/rest';
import {generate} from 'generate-password';
import {PasswordKeys} from '../keys/password-keys';
import {serviceKeys as keys} from '../keys/service-keys';
import {Usuario} from '../models';
import {EmailNotification} from '../models/email-notification.model';
import {UserlogRepository, UsuarioRepository} from '../repositories';
import {EncryptDecrypt} from '../service/ecryptdescrypt.service';
import {NotificationService} from '../service/notification.service';

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @repository(UserlogRepository)
    public userlogRepository: UserlogRepository,
  ) {}

  @post('/usuario', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['id'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    let us = await this.usuarioRepository.create(usuario);
    let randomPassword = generate({
      length: PasswordKeys.LENGTH,
      numbers: PasswordKeys.NUMBERS,
      lowercase: PasswordKeys.LOWERCASE,
      uppercase: PasswordKeys.UPPERCASE
    )
  };
    let password1 = await new EncryptDecrypt(keys.MD5).Encrypt(randomPassword);
    let password2 = new EncryptDecrypt(keys.MD5).Encrypt(password1);
    let ul = {
      username: us.celular,
      password: password2,
      role: 1,
      usuarioId: us.id
    };
    let user = await this.userlogRepository.create(ul);

let notification = new EmailNotification({
  textBody: `Hola ${us.name} ${us.lastname}, Se ha creado una cuenta a su nombre, su usuario es su documento de identidad y su contraseña es: ${randomPassword}`,
  htmlBody: `Hola ${us.name} ${us.lastname}, <br /> Se ha creado una cuenta a su nombre, su usuario es su documento de identidad y su contraseña es: <strong>${randomPassword}</strong>`,
  to: us.email,
  subject: 'Nueva Cuenta'
});
await new NotificationService().MainNotification(notification);
console.log(randomPassword);
user.password = '';
us.userlog = user;
return us;
}

@get('/usuario/count', {
  responses: {
    '200': {
      description: 'Usuario model count',
      content: {'application/json': {schema: CountSchema}},
    },
  },
})
async count(
    @param.where(Usuario) where ?: Where < Usuario >,
  ): Promise < Count > {
  return this.usuarioRepository.count(where);
}

@get('/usuario', {
  responses: {
    '200': {
      description: 'Array of Usuario model instances',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(Usuario, {includeRelations: true}),
          },
        },
      },
    },
  },
})
async find(
    @param.filter(Usuario) filter ?: Filter < Usuario >,
  ): Promise < Usuario[] > {
  return this.usuarioRepository.find(filter);
}

@patch('/usuario', {
  responses: {
    '200': {
      description: 'Usuario PATCH success count',
      content: {'application/json': {schema: CountSchema}},
    },
  },
})
async updateAll(
    @requestBody({
  content: {
    'application/json': {
      schema: getModelSchemaRef(Usuario, {partial: true}),
    },
  },
})
usuario: Usuario,
    @param.where(Usuario) where ?: Where < Usuario >,
  ): Promise < Count > {
  return this.usuarioRepository.updateAll(usuario, where);
}

@get('/usuario/{id}', {
  responses: {
    '200': {
      description: 'Usuario model instance',
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  },
})
async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'}) filter ?: FilterExcludingWhere<Usuario>
  ): Promise < Usuario > {
  return this.usuarioRepository.findById(id, filter);
}

@patch('/usuario/{id}', {
  responses: {
    '204': {
      description: 'Usuario PATCH success',
    },
  },
})
async updateById(
    @param.path.string('id') id: string,
    @requestBody({
  content: {
    'application/json': {
      schema: getModelSchemaRef(Usuario, {partial: true}),
    },
  },
})
usuario: Usuario,
  ): Promise < void> {
  await this.usuarioRepository.updateById(id, usuario);
}

@put('/usuario/{id}', {
  responses: {
    '204': {
      description: 'Usuario PUT success',
    },
  },
})
async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise < void> {

  let us = await this.userlogRepository.findOne({where: {usuarioId: usuario.id}})
    if(us) {
    us.username = usuario.celular;
    await this.userlogRepository.replaceById(us.id, us);
  }
    await this.usuarioRepository.replaceById(id, usuario);
}

@del('/usuario/{id}', {
  responses: {
    '204': {
      description: 'Usuario DELETE success',
    },
  },
})
async deleteById(@param.path.string('id') id: string): Promise < void> {
  await this.usuarioRepository.deleteById(id);
}
}
/** */
