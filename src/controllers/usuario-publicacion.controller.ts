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
  Publicacion,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioPublicacionController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/publicacions', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Publicacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Publicacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Publicacion>,
  ): Promise<Publicacion[]> {
    return this.usuarioRepository.publicacions(id).find(filter);
  }

  @post('/usuarios/{id}/publicacions', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Publicacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publicacion, {
            title: 'NewPublicacionInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) publicacion: Omit<Publicacion, 'id'>,
  ): Promise<Publicacion> {
    return this.usuarioRepository.publicacions(id).create(publicacion);
  }

  @patch('/usuarios/{id}/publicacions', {
    responses: {
      '200': {
        description: 'Usuario.Publicacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publicacion, {partial: true}),
        },
      },
    })
    publicacion: Partial<Publicacion>,
    @param.query.object('where', getWhereSchemaFor(Publicacion)) where?: Where<Publicacion>,
  ): Promise<Count> {
    return this.usuarioRepository.publicacions(id).patch(publicacion, where);
  }

  @del('/usuarios/{id}/publicacions', {
    responses: {
      '200': {
        description: 'Usuario.Publicacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Publicacion)) where?: Where<Publicacion>,
  ): Promise<Count> {
    return this.usuarioRepository.publicacions(id).delete(where);
  }
}
