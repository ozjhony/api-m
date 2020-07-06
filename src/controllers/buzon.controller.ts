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
import {Buzon} from '../models';
import {BuzonRepository} from '../repositories';

export class BuzonController {
  constructor(
    @repository(BuzonRepository)
    public buzonRepository : BuzonRepository,
  ) {}

  @post('/buzon', {
    responses: {
      '200': {
        description: 'Buzon model instance',
        content: {'application/json': {schema: getModelSchemaRef(Buzon)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Buzon, {
            title: 'NewBuzon',
            exclude: ['id'],
          }),
        },
      },
    })
    buzon: Omit<Buzon, 'id'>,
  ): Promise<Buzon> {
    return this.buzonRepository.create(buzon);
  }

  @get('/buzon/count', {
    responses: {
      '200': {
        description: 'Buzon model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Buzon) where?: Where<Buzon>,
  ): Promise<Count> {
    return this.buzonRepository.count(where);
  }

  @get('/buzon', {
    responses: {
      '200': {
        description: 'Array of Buzon model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Buzon, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Buzon) filter?: Filter<Buzon>,
  ): Promise<Buzon[]> {
    return this.buzonRepository.find(filter);
  }

  @patch('/buzon', {
    responses: {
      '200': {
        description: 'Buzon PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Buzon, {partial: true}),
        },
      },
    })
    buzon: Buzon,
    @param.where(Buzon) where?: Where<Buzon>,
  ): Promise<Count> {
    return this.buzonRepository.updateAll(buzon, where);
  }

  @get('/buzon/{id}', {
    responses: {
      '200': {
        description: 'Buzon model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Buzon, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Buzon, {exclude: 'where'}) filter?: FilterExcludingWhere<Buzon>
  ): Promise<Buzon> {
    return this.buzonRepository.findById(id, filter);
  }

  @patch('/buzon/{id}', {
    responses: {
      '204': {
        description: 'Buzon PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Buzon, {partial: true}),
        },
      },
    })
    buzon: Buzon,
  ): Promise<void> {
    await this.buzonRepository.updateById(id, buzon);
  }

  @put('/buzon/{id}', {
    responses: {
      '204': {
        description: 'Buzon PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() buzon: Buzon,
  ): Promise<void> {
    await this.buzonRepository.replaceById(id, buzon);
  }

  @del('/buzon/{id}', {
    responses: {
      '204': {
        description: 'Buzon DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.buzonRepository.deleteById(id);
  }
}
