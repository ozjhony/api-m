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
import {Capitulos} from '../models';
import {CapitulosRepository} from '../repositories';

export class CapitulosController {
  constructor(
    @repository(CapitulosRepository)
    public capitulosRepository : CapitulosRepository,
  ) {}

  @post('/capitulo', {
    responses: {
      '200': {
        description: 'Capitulos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Capitulos)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Capitulos, {
            title: 'NewCapitulos',
            exclude: ['id'],
          }),
        },
      },
    })
    capitulos: Omit<Capitulos, 'id'>,
  ): Promise<Capitulos> {
    return this.capitulosRepository.create(capitulos);
  }

  @get('/capitulo/count', {
    responses: {
      '200': {
        description: 'Capitulos model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Capitulos) where?: Where<Capitulos>,
  ): Promise<Count> {
    return this.capitulosRepository.count(where);
  }

  @get('/capitulo', {
    responses: {
      '200': {
        description: 'Array of Capitulos model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Capitulos, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Capitulos) filter?: Filter<Capitulos>,
  ): Promise<Capitulos[]> {
    return this.capitulosRepository.find(filter);
  }

  @patch('/capitulo', {
    responses: {
      '200': {
        description: 'Capitulos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Capitulos, {partial: true}),
        },
      },
    })
    capitulos: Capitulos,
    @param.where(Capitulos) where?: Where<Capitulos>,
  ): Promise<Count> {
    return this.capitulosRepository.updateAll(capitulos, where);
  }

  @get('/capitulo/{id}', {
    responses: {
      '200': {
        description: 'Capitulos model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Capitulos, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Capitulos, {exclude: 'where'}) filter?: FilterExcludingWhere<Capitulos>
  ): Promise<Capitulos> {
    return this.capitulosRepository.findById(id, filter);
  }

  @patch('/capitulo/{id}', {
    responses: {
      '204': {
        description: 'Capitulos PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Capitulos, {partial: true}),
        },
      },
    })
    capitulos: Capitulos,
  ): Promise<void> {
    await this.capitulosRepository.updateById(id, capitulos);
  }

  @put('/capitulo/{id}', {
    responses: {
      '204': {
        description: 'Capitulos PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() capitulos: Capitulos,
  ): Promise<void> {
    await this.capitulosRepository.replaceById(id, capitulos);
  }

  @del('/capitulo/{id}', {
    responses: {
      '204': {
        description: 'Capitulos DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.capitulosRepository.deleteById(id);
  }
}
