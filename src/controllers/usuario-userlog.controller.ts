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
  Userlog,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioUserlogController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/userlog', {
    responses: {
      '200': {
        description: 'Usuario has one Userlog',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Userlog),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Userlog>,
  ): Promise<Userlog> {
    return this.usuarioRepository.userlog(id).get(filter);
  }

  @post('/usuarios/{id}/userlog', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Userlog)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userlog, {
            title: 'NewUserlogInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) userlog: Omit<Userlog, 'id'>,
  ): Promise<Userlog> {
    return this.usuarioRepository.userlog(id).create(userlog);
  }

  @patch('/usuarios/{id}/userlog', {
    responses: {
      '200': {
        description: 'Usuario.Userlog PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userlog, {partial: true}),
        },
      },
    })
    userlog: Partial<Userlog>,
    @param.query.object('where', getWhereSchemaFor(Userlog)) where?: Where<Userlog>,
  ): Promise<Count> {
    return this.usuarioRepository.userlog(id).patch(userlog, where);
  }

  @del('/usuarios/{id}/userlog', {
    responses: {
      '200': {
        description: 'Usuario.Userlog DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Userlog)) where?: Where<Userlog>,
  ): Promise<Count> {
    return this.usuarioRepository.userlog(id).delete(where);
  }
}
