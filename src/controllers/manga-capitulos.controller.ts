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
  Manga,
  Capitulos,
} from '../models';
import {MangaRepository} from '../repositories';

export class MangaCapitulosController {
  constructor(
    @repository(MangaRepository) protected mangaRepository: MangaRepository,
  ) { }

  @get('/manga/{id}/capitulos', {
    responses: {
      '200': {
        description: 'Array of Manga has many Capitulos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Capitulos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Capitulos>,
  ): Promise<Capitulos[]> {
    return this.mangaRepository.capitulos(id).find(filter);
  }

  @post('/manga/{id}/capitulos', {
    responses: {
      '200': {
        description: 'Manga model instance',
        content: {'application/json': {schema: getModelSchemaRef(Capitulos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Manga.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Capitulos, {
            title: 'NewCapitulosInManga',
            exclude: ['id'],
            optional: ['mangaId']
          }),
        },
      },
    }) capitulos: Omit<Capitulos, 'id'>,
  ): Promise<Capitulos> {
    return this.mangaRepository.capitulos(id).create(capitulos);
  }

  @patch('/manga/{id}/capitulos', {
    responses: {
      '200': {
        description: 'Manga.Capitulos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Capitulos, {partial: true}),
        },
      },
    })
    capitulos: Partial<Capitulos>,
    @param.query.object('where', getWhereSchemaFor(Capitulos)) where?: Where<Capitulos>,
  ): Promise<Count> {
    return this.mangaRepository.capitulos(id).patch(capitulos, where);
  }

  @del('/manga/{id}/capitulos', {
    responses: {
      '200': {
        description: 'Manga.Capitulos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Capitulos)) where?: Where<Capitulos>,
  ): Promise<Count> {
    return this.mangaRepository.capitulos(id).delete(where);
  }
}
