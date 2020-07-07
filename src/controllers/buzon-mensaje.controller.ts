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
  Buzon,
  Mensaje,
} from '../models';
import {BuzonRepository} from '../repositories';

export class BuzonMensajeController {
  constructor(
    @repository(BuzonRepository) protected buzonRepository: BuzonRepository,
  ) { }

  @get('/buzons/{id}/mensajes', {
    responses: {
      '200': {
        description: 'Array of Buzon has many Mensaje',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mensaje)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Mensaje>,
  ): Promise<Mensaje[]> {
    return this.buzonRepository.mensajes(id).find(filter);
  }

  @post('/buzons/{id}/mensajes', {
    responses: {
      '200': {
        description: 'Buzon model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mensaje)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Buzon.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensaje, {
            title: 'NewMensajeInBuzon',
            exclude: ['id'],
            optional: ['buzonId']
          }),
        },
      },
    }) mensaje: Omit<Mensaje, 'id'>,
  ): Promise<Mensaje> {
    return this.buzonRepository.mensajes(id).create(mensaje);
  }

  @patch('/buzons/{id}/mensajes', {
    responses: {
      '200': {
        description: 'Buzon.Mensaje PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mensaje, {partial: true}),
        },
      },
    })
    mensaje: Partial<Mensaje>,
    @param.query.object('where', getWhereSchemaFor(Mensaje)) where?: Where<Mensaje>,
  ): Promise<Count> {
    return this.buzonRepository.mensajes(id).patch(mensaje, where);
  }

  @del('/buzons/{id}/mensajes', {
    responses: {
      '200': {
        description: 'Buzon.Mensaje DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Mensaje)) where?: Where<Mensaje>,
  ): Promise<Count> {
    return this.buzonRepository.mensajes(id).delete(where);
  }
}
