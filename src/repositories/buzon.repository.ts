import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Buzon, BuzonRelations, Usuario, Mensaje} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsuarioRepository} from './usuario.repository';
import {MensajeRepository} from './mensaje.repository';

export class BuzonRepository extends DefaultCrudRepository<
  Buzon,
  typeof Buzon.prototype.id,
  BuzonRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Buzon.prototype.id>;

  public readonly mensajes: HasManyRepositoryFactory<Mensaje, typeof Buzon.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('MensajeRepository') protected mensajeRepositoryGetter: Getter<MensajeRepository>,
  ) {
    super(Buzon, dataSource);
    this.mensajes = this.createHasManyRepositoryFactoryFor('mensajes', mensajeRepositoryGetter,);
    this.registerInclusionResolver('mensajes', this.mensajes.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
