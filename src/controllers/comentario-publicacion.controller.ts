import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Comentario,
  Publicacion,
} from '../models';
import {ComentarioRepository} from '../repositories';

export class ComentarioPublicacionController {
  constructor(
    @repository(ComentarioRepository)
    public comentarioRepository: ComentarioRepository,
  ) { }

  @get('/comentarios/{id}/publicacion', {
    responses: {
      '200': {
        description: 'Publicacion belonging to Comentario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Publicacion)},
          },
        },
      },
    },
  })
  async getPublicacion(
    @param.path.string('id') id: typeof Comentario.prototype.id,
  ): Promise<Publicacion> {
    return this.comentarioRepository.publicacion(id);
  }
}
