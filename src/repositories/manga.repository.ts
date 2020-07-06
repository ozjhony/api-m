import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {Manga, MangaRelations, Capitulos, Biblioteca} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CapitulosRepository} from './capitulos.repository';
import {BibliotecaRepository} from './biblioteca.repository';

export class MangaRepository extends DefaultCrudRepository<
  Manga,
  typeof Manga.prototype.id,
  MangaRelations
> {

  public readonly capitulos: HasManyRepositoryFactory<Capitulos, typeof Manga.prototype.id>;

  public readonly biblioteca: BelongsToAccessor<Biblioteca, typeof Manga.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CapitulosRepository') protected capitulosRepositoryGetter: Getter<CapitulosRepository>, @repository.getter('BibliotecaRepository') protected bibliotecaRepositoryGetter: Getter<BibliotecaRepository>,
  ) {
    super(Manga, dataSource);
    this.biblioteca = this.createBelongsToAccessorFor('biblioteca', bibliotecaRepositoryGetter,);
    this.registerInclusionResolver('biblioteca', this.biblioteca.inclusionResolver);
    this.capitulos = this.createHasManyRepositoryFactoryFor('capitulos', capitulosRepositoryGetter,);
    this.registerInclusionResolver('capitulos', this.capitulos.inclusionResolver);
  }
}
