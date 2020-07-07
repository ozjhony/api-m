import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Publicacion,
  Usuario,
} from '../models';
import {PublicacionRepository} from '../repositories';

export class PublicacionUsuarioController {
  constructor(
    @repository(PublicacionRepository)
    public publicacionRepository: PublicacionRepository,
  ) { }

  @get('/publicacions/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Publicacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Publicacion.prototype.id,
  ): Promise<Usuario> {
    return this.publicacionRepository.usuario(id);
  }
}
