import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Publicacion, PublicacionRelations, Usuario, Comentario} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsuarioRepository} from './usuario.repository';
import {ComentarioRepository} from './comentario.repository';

export class PublicacionRepository extends DefaultCrudRepository<
  Publicacion,
  typeof Publicacion.prototype.id,
  PublicacionRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Publicacion.prototype.id>;

  public readonly comentarios: HasManyRepositoryFactory<Comentario, typeof Publicacion.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('ComentarioRepository') protected comentarioRepositoryGetter: Getter<ComentarioRepository>,
  ) {
    super(Publicacion, dataSource);
    this.comentarios = this.createHasManyRepositoryFactoryFor('comentarios', comentarioRepositoryGetter,);
    this.registerInclusionResolver('comentarios', this.comentarios.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
