import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Comentario} from '../models';
import {ComentarioRepository} from '../repositories';

export class ComentarioController {
  constructor(
    @repository(ComentarioRepository)
    public comentarioRepository : ComentarioRepository,
  ) {}

  @post('/comentario', {
    responses: {
      '200': {
        description: 'Comentario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comentario)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comentario, {
            title: 'NewComentario',
            exclude: ['id'],
          }),
        },
      },
    })
    comentario: Omit<Comentario, 'id'>,
  ): Promise<Comentario> {
    return this.comentarioRepository.create(comentario);
  }

  @get('/comentario/count', {
    responses: {
      '200': {
        description: 'Comentario model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Comentario) where?: Where<Comentario>,
  ): Promise<Count> {
    return this.comentarioRepository.count(where);
  }

  @get('/comentario', {
    responses: {
      '200': {
        description: 'Array of Comentario model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Comentario, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Comentario) filter?: Filter<Comentario>,
  ): Promise<Comentario[]> {
    return this.comentarioRepository.find(filter);
  }

  @patch('/comentario', {
    responses: {
      '200': {
        description: 'Comentario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comentario, {partial: true}),
        },
      },
    })
    comentario: Comentario,
    @param.where(Comentario) where?: Where<Comentario>,
  ): Promise<Count> {
    return this.comentarioRepository.updateAll(comentario, where);
  }

  @get('/comentario/{id}', {
    responses: {
      '200': {
        description: 'Comentario model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Comentario, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Comentario, {exclude: 'where'}) filter?: FilterExcludingWhere<Comentario>
  ): Promise<Comentario> {
    return this.comentarioRepository.findById(id, filter);
  }

  @patch('/comentario/{id}', {
    responses: {
      '204': {
        description: 'Comentario PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comentario, {partial: true}),
        },
      },
    })
    comentario: Comentario,
  ): Promise<void> {
    await this.comentarioRepository.updateById(id, comentario);
  }

  @put('/comentario/{id}', {
    responses: {
      '204': {
        description: 'Comentario PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() comentario: Comentario,
  ): Promise<void> {
    await this.comentarioRepository.replaceById(id, comentario);
  }

  @del('/comentario/{id}', {
    responses: {
      '204': {
        description: 'Comentario DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.comentarioRepository.deleteById(id);
  }
}
