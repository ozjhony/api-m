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
import {Userlog} from '../models';
import {UserlogRepository} from '../repositories';

export class UserLogController {
  constructor(
    @repository(UserlogRepository)
    public userlogRepository : UserlogRepository,
  ) {}

  @post('/userlog', {
    responses: {
      '200': {
        description: 'Userlog model instance',
        content: {'application/json': {schema: getModelSchemaRef(Userlog)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userlog, {
            title: 'NewUserlog',
            exclude: ['id'],
          }),
        },
      },
    })
    userlog: Omit<Userlog, 'id'>,
  ): Promise<Userlog> {
    return this.userlogRepository.create(userlog);
  }

  @get('/userlog/count', {
    responses: {
      '200': {
        description: 'Userlog model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Userlog) where?: Where<Userlog>,
  ): Promise<Count> {
    return this.userlogRepository.count(where);
  }

  @get('/userlog', {
    responses: {
      '200': {
        description: 'Array of Userlog model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Userlog, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Userlog) filter?: Filter<Userlog>,
  ): Promise<Userlog[]> {
    return this.userlogRepository.find(filter);
  }

  @patch('/userlog', {
    responses: {
      '200': {
        description: 'Userlog PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userlog, {partial: true}),
        },
      },
    })
    userlog: Userlog,
    @param.where(Userlog) where?: Where<Userlog>,
  ): Promise<Count> {
    return this.userlogRepository.updateAll(userlog, where);
  }

  @get('/userlog/{id}', {
    responses: {
      '200': {
        description: 'Userlog model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Userlog, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Userlog, {exclude: 'where'}) filter?: FilterExcludingWhere<Userlog>
  ): Promise<Userlog> {
    return this.userlogRepository.findById(id, filter);
  }

  @patch('/userlog/{id}', {
    responses: {
      '204': {
        description: 'Userlog PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userlog, {partial: true}),
        },
      },
    })
    userlog: Userlog,
  ): Promise<void> {
    await this.userlogRepository.updateById(id, userlog);
  }

  @put('/userlog/{id}', {
    responses: {
      '204': {
        description: 'Userlog PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() userlog: Userlog,
  ): Promise<void> {
    await this.userlogRepository.replaceById(id, userlog);
  }

  @del('/userlog/{id}', {
    responses: {
      '204': {
        description: 'Userlog DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userlogRepository.deleteById(id);
  }
}
