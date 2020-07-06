import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Capitulos,
  Manga,
} from '../models';
import {CapitulosRepository} from '../repositories';

export class CapitulosMangaController {
  constructor(
    @repository(CapitulosRepository)
    public capitulosRepository: CapitulosRepository,
  ) { }

  @get('/capitulos/{id}/manga', {
    responses: {
      '200': {
        description: 'Manga belonging to Capitulos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Manga)},
          },
        },
      },
    },
  })
  async getManga(
    @param.path.string('id') id: typeof Capitulos.prototype.id,
  ): Promise<Manga> {
    return this.capitulosRepository.manga(id);
  }
}
