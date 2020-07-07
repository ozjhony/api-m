import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Biblioteca, BibliotecaRelations, Manga, Usuario} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {MangaRepository} from './manga.repository';
import {UsuarioRepository} from './usuario.repository';

export class BibliotecaRepository extends DefaultCrudRepository<
  Biblioteca,
  typeof Biblioteca.prototype.id,
  BibliotecaRelations
> {

  public readonly manga: HasManyRepositoryFactory<Manga, typeof Biblioteca.prototype.id>;

  public readonly usuario: HasManyRepositoryFactory<Usuario, typeof Biblioteca.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MangaRepository') protected mangaRepositoryGetter: Getter<MangaRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Biblioteca, dataSource);
    this.usuario = this.createHasManyRepositoryFactoryFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
    this.manga = this.createHasManyRepositoryFactoryFor('manga', mangaRepositoryGetter,);
    this.registerInclusionResolver('manga', this.manga.inclusionResolver);
  }
}
