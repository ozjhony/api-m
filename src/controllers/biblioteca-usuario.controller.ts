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
  Biblioteca,
  Usuario,
} from '../models';
import {BibliotecaRepository} from '../repositories';

export class BibliotecaUsuarioController {
  constructor(
    @repository(BibliotecaRepository) protected bibliotecaRepository: BibliotecaRepository,
  ) { }

  @get('/bibliotecas/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Biblioteca has many Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.bibliotecaRepository.usuario(id).find(filter);
  }

  @post('/bibliotecas/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Biblioteca model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Biblioteca.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInBiblioteca',
            exclude: ['id'],
            optional: ['bibliotecaId']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    return this.bibliotecaRepository.usuario(id).create(usuario);
  }

  @patch('/bibliotecas/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Biblioteca.Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Partial<Usuario>,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.bibliotecaRepository.usuario(id).patch(usuario, where);
  }

  @del('/bibliotecas/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Biblioteca.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.bibliotecaRepository.usuario(id).delete(where);
  }
}
