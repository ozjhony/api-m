import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Denuncia, DenunciaRelations, Usuario} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsuarioRepository} from './usuario.repository';

export class DenunciaRepository extends DefaultCrudRepository<
  Denuncia,
  typeof Denuncia.prototype.id,
  DenunciaRelations
> {

  public readonly usuario: HasOneRepositoryFactory<Usuario, typeof Denuncia.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Denuncia, dataSource);
    this.usuario = this.createHasOneRepositoryFactoryFor('usuario', usuarioRepositoryGetter);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
