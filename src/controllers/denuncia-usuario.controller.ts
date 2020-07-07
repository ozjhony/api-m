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
  Denuncia,
  Usuario,
} from '../models';
import {DenunciaRepository} from '../repositories';

export class DenunciaUsuarioController {
  constructor(
    @repository(DenunciaRepository) protected denunciaRepository: DenunciaRepository,
  ) { }

  @get('/denuncias/{id}/usuario', {
    responses: {
      '200': {
        description: 'Denuncia has one Usuario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Usuario),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario> {
    return this.denunciaRepository.usuario(id).get(filter);
  }

  @post('/denuncias/{id}/usuario', {
    responses: {
      '200': {
        description: 'Denuncia model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Denuncia.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInDenuncia',
            exclude: ['id'],
            optional: ['denunciaId']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    return this.denunciaRepository.usuario(id).create(usuario);
  }

  @patch('/denuncias/{id}/usuario', {
    responses: {
      '200': {
        description: 'Denuncia.Usuario PATCH success count',
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
    return this.denunciaRepository.usuario(id).patch(usuario, where);
  }

  @del('/denuncias/{id}/usuario', {
    responses: {
      '200': {
        description: 'Denuncia.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.denunciaRepository.usuario(id).delete(where);
  }
}
