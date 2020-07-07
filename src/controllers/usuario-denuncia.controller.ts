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
  Denuncia,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioDenunciaController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/denuncias', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Denuncia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Denuncia)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Denuncia>,
  ): Promise<Denuncia[]> {
    return this.usuarioRepository.denuncias(id).find(filter);
  }

  @post('/usuarios/{id}/denuncias', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Denuncia)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Denuncia, {
            title: 'NewDenunciaInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) denuncia: Omit<Denuncia, 'id'>,
  ): Promise<Denuncia> {
    return this.usuarioRepository.denuncias(id).create(denuncia);
  }

  @patch('/usuarios/{id}/denuncias', {
    responses: {
      '200': {
        description: 'Usuario.Denuncia PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Denuncia, {partial: true}),
        },
      },
    })
    denuncia: Partial<Denuncia>,
    @param.query.object('where', getWhereSchemaFor(Denuncia)) where?: Where<Denuncia>,
  ): Promise<Count> {
    return this.usuarioRepository.denuncias(id).patch(denuncia, where);
  }

  @del('/usuarios/{id}/denuncias', {
    responses: {
      '200': {
        description: 'Usuario.Denuncia DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Denuncia)) where?: Where<Denuncia>,
  ): Promise<Count> {
    return this.usuarioRepository.denuncias(id).delete(where);
  }
}
