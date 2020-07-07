import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {Usuario, UsuarioRelations, Userlog, Buzon, Publicacion, Denuncia} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserlogRepository} from './userlog.repository';
import {BuzonRepository} from './buzon.repository';
import {PublicacionRepository} from './publicacion.repository';
import {DenunciaRepository} from './denuncia.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly userlog: HasOneRepositoryFactory<Userlog, typeof Usuario.prototype.id>;

  public readonly buzon: HasOneRepositoryFactory<Buzon, typeof Usuario.prototype.id>;

  public readonly publicacions: HasManyRepositoryFactory<Publicacion, typeof Usuario.prototype.id>;

  public readonly denuncias: HasManyRepositoryFactory<Denuncia, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UserlogRepository') protected userlogRepositoryGetter: Getter<UserlogRepository>, @repository.getter('BuzonRepository') protected buzonRepositoryGetter: Getter<BuzonRepository>, @repository.getter('PublicacionRepository') protected publicacionRepositoryGetter: Getter<PublicacionRepository>, @repository.getter('DenunciaRepository') protected denunciaRepositoryGetter: Getter<DenunciaRepository>,
  ) {
    super(Usuario, dataSource);
    this.denuncias = this.createHasManyRepositoryFactoryFor('denuncias', denunciaRepositoryGetter,);
    this.registerInclusionResolver('denuncias', this.denuncias.inclusionResolver);
    this.publicacions = this.createHasManyRepositoryFactoryFor('publicacions', publicacionRepositoryGetter,);
    this.registerInclusionResolver('publicacions', this.publicacions.inclusionResolver);
    this.buzon = this.createHasOneRepositoryFactoryFor('buzon', buzonRepositoryGetter);
    this.registerInclusionResolver('buzon', this.buzon.inclusionResolver);
    this.userlog = this.createHasOneRepositoryFactoryFor('userlog', userlogRepositoryGetter);
    this.registerInclusionResolver('userlog', this.userlog.inclusionResolver);
  }
}
