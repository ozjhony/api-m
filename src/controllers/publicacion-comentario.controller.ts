import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Publicacion,
  Comentario,
} from '../models';
import {PublicacionRepository} from '../repositories';

export class PublicacionComentarioController {
  constructor(
    @repository(PublicacionRepository) protected publicacionRepository: PublicacionRepository,
  ) { }

  @get('/publicacions/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Array of Publicacion has many Comentario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comentario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Comentario>,
  ): Promise<Comentario[]> {
    return this.publicacionRepository.comentarios(id).find(filter);
  }

  @post('/publicacions/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Publicacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comentario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Publicacion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comentario, {
            title: 'NewComentarioInPublicacion',
            exclude: ['id'],
            optional: ['publicacionId']
          }),
        },
      },
    }) comentario: Omit<Comentario, 'id'>,
  ): Promise<Comentario> {
    return this.publicacionRepository.comentarios(id).create(comentario);
  }

  @patch('/publicacions/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Publicacion.Comentario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comentario, {partial: true}),
        },
      },
    })
    comentario: Partial<Comentario>,
    @param.query.object('where', getWhereSchemaFor(Comentario)) where?: Where<Comentario>,
  ): Promise<Count> {
    return this.publicacionRepository.comentarios(id).patch(comentario, where);
  }

  @del('/publicacions/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Publicacion.Comentario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Comentario)) where?: Where<Comentario>,
  ): Promise<Count> {
    return this.publicacionRepository.comentarios(id).delete(where);
  }
}
