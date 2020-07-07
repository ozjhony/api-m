import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Mensaje, MensajeRelations, Buzon} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {BuzonRepository} from './buzon.repository';

export class MensajeRepository extends DefaultCrudRepository<
  Mensaje,
  typeof Mensaje.prototype.id,
  MensajeRelations
> {

  public readonly buzon: BelongsToAccessor<Buzon, typeof Mensaje.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('BuzonRepository') protected buzonRepositoryGetter: Getter<BuzonRepository>,
  ) {
    super(Mensaje, dataSource);
    this.buzon = this.createBelongsToAccessorFor('buzon', buzonRepositoryGetter,);
    this.registerInclusionResolver('buzon', this.buzon.inclusionResolver);
  }
}
