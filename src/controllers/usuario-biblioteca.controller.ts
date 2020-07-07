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
  Biblioteca,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioBibliotecaController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/biblioteca', {
    responses: {
      '200': {
        description: 'Usuario has one Biblioteca',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Biblioteca),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Biblioteca>,
  ): Promise<Biblioteca> {
    return this.usuarioRepository.biblioteca(id).get(filter);
  }

  @post('/usuarios/{id}/biblioteca', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Biblioteca)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Biblioteca, {
            title: 'NewBibliotecaInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) biblioteca: Omit<Biblioteca, 'id'>,
  ): Promise<Biblioteca> {
    return this.usuarioRepository.biblioteca(id).create(biblioteca);
  }

  @patch('/usuarios/{id}/biblioteca', {
    responses: {
      '200': {
        description: 'Usuario.Biblioteca PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Biblioteca, {partial: true}),
        },
      },
    })
    biblioteca: Partial<Biblioteca>,
    @param.query.object('where', getWhereSchemaFor(Biblioteca)) where?: Where<Biblioteca>,
  ): Promise<Count> {
    return this.usuarioRepository.biblioteca(id).patch(biblioteca, where);
  }

  @del('/usuarios/{id}/biblioteca', {
    responses: {
      '200': {
        description: 'Usuario.Biblioteca DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Biblioteca)) where?: Where<Biblioteca>,
  ): Promise<Count> {
    return this.usuarioRepository.biblioteca(id).delete(where);
  }
}
