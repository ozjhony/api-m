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
import {Manga} from '../models';
import {MangaRepository} from '../repositories';

export class MangaController {
  constructor(
    @repository(MangaRepository)
    public mangaRepository : MangaRepository,
  ) {}

  @post('/manga', {
    responses: {
      '200': {
        description: 'Manga model instance',
        content: {'application/json': {schema: getModelSchemaRef(Manga)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manga, {
            title: 'NewManga',
            exclude: ['id'],
          }),
        },
      },
    })
    manga: Omit<Manga, 'id'>,
  ): Promise<Manga> {
    return this.mangaRepository.create(manga);
  }

  @get('/manga/count', {
    responses: {
      '200': {
        description: 'Manga model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Manga) where?: Where<Manga>,
  ): Promise<Count> {
    return this.mangaRepository.count(where);
  }

  @get('/manga', {
    responses: {
      '200': {
        description: 'Array of Manga model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Manga, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Manga) filter?: Filter<Manga>,
  ): Promise<Manga[]> {
    return this.mangaRepository.find(filter);
  }

  @patch('/manga', {
    responses: {
      '200': {
        description: 'Manga PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manga, {partial: true}),
        },
      },
    })
    manga: Manga,
    @param.where(Manga) where?: Where<Manga>,
  ): Promise<Count> {
    return this.mangaRepository.updateAll(manga, where);
  }

  @get('/manga/{id}', {
    responses: {
      '200': {
        description: 'Manga model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Manga, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Manga, {exclude: 'where'}) filter?: FilterExcludingWhere<Manga>
  ): Promise<Manga> {
    return this.mangaRepository.findById(id, filter);
  }

  @patch('/manga/{id}', {
    responses: {
      '204': {
        description: 'Manga PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manga, {partial: true}),
        },
      },
    })
    manga: Manga,
  ): Promise<void> {
    await this.mangaRepository.updateById(id, manga);
  }

  @put('/manga/{id}', {
    responses: {
      '204': {
        description: 'Manga PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() manga: Manga,
  ): Promise<void> {
    await this.mangaRepository.replaceById(id, manga);
  }

  @del('/manga/{id}', {
    responses: {
      '204': {
        description: 'Manga DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mangaRepository.deleteById(id);
  }
}
