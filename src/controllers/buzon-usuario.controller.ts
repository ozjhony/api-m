import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Buzon,
  Usuario,
} from '../models';
import {BuzonRepository} from '../repositories';

export class BuzonUsuarioController {
  constructor(
    @repository(BuzonRepository)
    public buzonRepository: BuzonRepository,
  ) { }

  @get('/buzons/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Buzon',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Buzon.prototype.id,
  ): Promise<Usuario> {
    return this.buzonRepository.usuario(id);
  }
}
