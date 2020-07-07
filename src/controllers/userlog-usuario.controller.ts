import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Userlog,
  Usuario,
} from '../models';
import {UserlogRepository} from '../repositories';

export class UserlogUsuarioController {
  constructor(
    @repository(UserlogRepository)
    public userlogRepository: UserlogRepository,
  ) { }

  @get('/userlogs/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Userlog',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Userlog.prototype.id,
  ): Promise<Usuario> {
    return this.userlogRepository.usuario(id);
  }
}
