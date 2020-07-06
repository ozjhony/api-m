import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Capitulos, CapitulosRelations, Manga} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MangaRepository} from './manga.repository';

export class CapitulosRepository extends DefaultCrudRepository<
  Capitulos,
  typeof Capitulos.prototype.id,
  CapitulosRelations
> {

  public readonly manga: BelongsToAccessor<Manga, typeof Capitulos.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MangaRepository') protected mangaRepositoryGetter: Getter<MangaRepository>,
  ) {
    super(Capitulos, dataSource);
    this.manga = this.createBelongsToAccessorFor('manga', mangaRepositoryGetter,);
    this.registerInclusionResolver('manga', this.manga.inclusionResolver);
  }
}
