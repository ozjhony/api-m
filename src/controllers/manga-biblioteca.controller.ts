import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Manga,
  Biblioteca,
} from '../models';
import {MangaRepository} from '../repositories';

export class MangaBibliotecaController {
  constructor(
    @repository(MangaRepository)
    public mangaRepository: MangaRepository,
  ) { }

  @get('/manga/{id}/biblioteca', {
    responses: {
      '200': {
        description: 'Biblioteca belonging to Manga',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Biblioteca)},
          },
        },
      },
    },
  })
  async getBiblioteca(
    @param.path.string('id') id: typeof Manga.prototype.id,
  ): Promise<Biblioteca> {
    return this.mangaRepository.biblioteca(id);
  }
}
