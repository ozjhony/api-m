import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Userlog, UserlogRelations, Usuario} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsuarioRepository} from './usuario.repository';

export class UserlogRepository extends DefaultCrudRepository<
  Userlog,
  typeof Userlog.prototype.id,
  UserlogRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Userlog.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Userlog, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
