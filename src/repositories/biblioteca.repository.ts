import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Biblioteca, BibliotecaRelations, Manga} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MangaRepository} from './manga.repository';

export class BibliotecaRepository extends DefaultCrudRepository<
  Biblioteca,
  typeof Biblioteca.prototype.id,
  BibliotecaRelations
> {

  public readonly manga: HasManyRepositoryFactory<Manga, typeof Biblioteca.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MangaRepository') protected mangaRepositoryGetter: Getter<MangaRepository>,
  ) {
    super(Biblioteca, dataSource);
    this.manga = this.createHasManyRepositoryFactoryFor('manga', mangaRepositoryGetter,);
    this.registerInclusionResolver('manga', this.manga.inclusionResolver);
  }
}
