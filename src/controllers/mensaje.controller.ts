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
import {Mensaje} from '../models';
import {MensajeRepository} from '../repositories';

export class MensajeController {
  constructor(
    @repository(MensajeRepository)
    public mensajeRepository : MensajeRepository,
  ) {}

  @post('/mensaje', {
    responses: {
      '200': {
        description: 'Mensaje model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mensaje)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensaje, {
            title: 'NewMensaje',
            exclude: ['id'],
          }),
        },
      },
    })
    mensaje: Omit<Mensaje, 'id'>,
  ): Promise<Mensaje> {
    return this.mensajeRepository.create(mensaje);
  }

  @get('/mensaje/count', {
    responses: {
      '200': {
        description: 'Mensaje model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Mensaje) where?: Where<Mensaje>,
  ): Promise<Count> {
    return this.mensajeRepository.count(where);
  }

  @get('/mensaje', {
    responses: {
      '200': {
        description: 'Array of Mensaje model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Mensaje, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Mensaje) filter?: Filter<Mensaje>,
  ): Promise<Mensaje[]> {
    return this.mensajeRepository.find(filter);
  }

  @patch('/mensaje', {
    responses: {
      '200': {
        description: 'Mensaje PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensaje, {partial: true}),
        },
      },
    })
    mensaje: Mensaje,
    @param.where(Mensaje) where?: Where<Mensaje>,
  ): Promise<Count> {
    return this.mensajeRepository.updateAll(mensaje, where);
  }

  @get('/mensaje/{id}', {
    responses: {
      '200': {
        description: 'Mensaje model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Mensaje, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Mensaje, {exclude: 'where'}) filter?: FilterExcludingWhere<Mensaje>
  ): Promise<Mensaje> {
    return this.mensajeRepository.findById(id, filter);
  }

  @patch('/mensaje/{id}', {
    responses: {
      '204': {
        description: 'Mensaje PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensaje, {partial: true}),
        },
      },
    })
    mensaje: Mensaje,
  ): Promise<void> {
    await this.mensajeRepository.updateById(id, mensaje);
  }

  @put('/mensaje/{id}', {
    responses: {
      '204': {
        description: 'Mensaje PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mensaje: Mensaje,
  ): Promise<void> {
    await this.mensajeRepository.replaceById(id, mensaje);
  }

  @del('/mensaje/{id}', {
    responses: {
      '204': {
        description: 'Mensaje DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mensajeRepository.deleteById(id);
  }
}
