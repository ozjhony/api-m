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
import {Denuncia} from '../models';
import {DenunciaRepository} from '../repositories';

export class DenunciaController {
  constructor(
    @repository(DenunciaRepository)
    public denunciaRepository : DenunciaRepository,
  ) {}

  @post('/denuncia', {
    responses: {
      '200': {
        description: 'Denuncia model instance',
        content: {'application/json': {schema: getModelSchemaRef(Denuncia)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Denuncia, {
            title: 'NewDenuncia',
            exclude: ['id'],
          }),
        },
      },
    })
    denuncia: Omit<Denuncia, 'id'>,
  ): Promise<Denuncia> {
    return this.denunciaRepository.create(denuncia);
  }

  @get('/denuncia/count', {
    responses: {
      '200': {
        description: 'Denuncia model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Denuncia) where?: Where<Denuncia>,
  ): Promise<Count> {
    return this.denunciaRepository.count(where);
  }

  @get('/denuncia', {
    responses: {
      '200': {
        description: 'Array of Denuncia model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Denuncia, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Denuncia) filter?: Filter<Denuncia>,
  ): Promise<Denuncia[]> {
    return this.denunciaRepository.find(filter);
  }

  @patch('/denuncia', {
    responses: {
      '200': {
        description: 'Denuncia PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Denuncia, {partial: true}),
        },
      },
    })
    denuncia: Denuncia,
    @param.where(Denuncia) where?: Where<Denuncia>,
  ): Promise<Count> {
    return this.denunciaRepository.updateAll(denuncia, where);
  }

  @get('/denuncia/{id}', {
    responses: {
      '200': {
        description: 'Denuncia model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Denuncia, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Denuncia, {exclude: 'where'}) filter?: FilterExcludingWhere<Denuncia>
  ): Promise<Denuncia> {
    return this.denunciaRepository.findById(id, filter);
  }

  @patch('/denuncia/{id}', {
    responses: {
      '204': {
        description: 'Denuncia PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Denuncia, {partial: true}),
        },
      },
    })
    denuncia: Denuncia,
  ): Promise<void> {
    await this.denunciaRepository.updateById(id, denuncia);
  }

  @put('/denuncia/{id}', {
    responses: {
      '204': {
        description: 'Denuncia PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() denuncia: Denuncia,
  ): Promise<void> {
    await this.denunciaRepository.replaceById(id, denuncia);
  }

  @del('/denuncia/{id}', {
    responses: {
      '204': {
        description: 'Denuncia DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.denunciaRepository.deleteById(id);
  }
}
