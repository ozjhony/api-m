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
  Usuario,
  Buzon,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioBuzonController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/buzon', {
    responses: {
      '200': {
        description: 'Usuario has one Buzon',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Buzon),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Buzon>,
  ): Promise<Buzon> {
    return this.usuarioRepository.buzon(id).get(filter);
  }

  @post('/usuarios/{id}/buzon', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Buzon)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Buzon, {
            title: 'NewBuzonInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) buzon: Omit<Buzon, 'id'>,
  ): Promise<Buzon> {
    return this.usuarioRepository.buzon(id).create(buzon);
  }

  @patch('/usuarios/{id}/buzon', {
    responses: {
      '200': {
        description: 'Usuario.Buzon PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Buzon, {partial: true}),
        },
      },
    })
    buzon: Partial<Buzon>,
    @param.query.object('where', getWhereSchemaFor(Buzon)) where?: Where<Buzon>,
  ): Promise<Count> {
    return this.usuarioRepository.buzon(id).patch(buzon, where);
  }

  @del('/usuarios/{id}/buzon', {
    responses: {
      '200': {
        description: 'Usuario.Buzon DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Buzon)) where?: Where<Buzon>,
  ): Promise<Count> {
    return this.usuarioRepository.buzon(id).delete(where);
  }
}
