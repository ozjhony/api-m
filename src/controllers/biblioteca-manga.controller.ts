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
  Manga,
} from '../models';
import {BibliotecaRepository} from '../repositories';

export class BibliotecaMangaController {
  constructor(
    @repository(BibliotecaRepository) protected bibliotecaRepository: BibliotecaRepository,
  ) { }

  @get('/bibliotecas/{id}/manga', {
    responses: {
      '200': {
        description: 'Array of Biblioteca has many Manga',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Manga)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Manga>,
  ): Promise<Manga[]> {
    return this.bibliotecaRepository.manga(id).find(filter);
  }

  @post('/bibliotecas/{id}/manga', {
    responses: {
      '200': {
        description: 'Biblioteca model instance',
        content: {'application/json': {schema: getModelSchemaRef(Manga)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Biblioteca.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manga, {
            title: 'NewMangaInBiblioteca',
            exclude: ['id'],
            optional: ['bibliotecaId']
          }),
        },
      },
    }) manga: Omit<Manga, 'id'>,
  ): Promise<Manga> {
    return this.bibliotecaRepository.manga(id).create(manga);
  }

  @patch('/bibliotecas/{id}/manga', {
    responses: {
      '200': {
        description: 'Biblioteca.Manga PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manga, {partial: true}),
        },
      },
    })
    manga: Partial<Manga>,
    @param.query.object('where', getWhereSchemaFor(Manga)) where?: Where<Manga>,
  ): Promise<Count> {
    return this.bibliotecaRepository.manga(id).patch(manga, where);
  }

  @del('/bibliotecas/{id}/manga', {
    responses: {
      '200': {
        description: 'Biblioteca.Manga DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Manga)) where?: Where<Manga>,
  ): Promise<Count> {
    return this.bibliotecaRepository.manga(id).delete(where);
  }
}
