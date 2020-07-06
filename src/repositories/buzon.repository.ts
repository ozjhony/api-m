import {DefaultCrudRepository} from '@loopback/repository';
import {Buzon, BuzonRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class BuzonRepository extends DefaultCrudRepository<
  Buzon,
  typeof Buzon.prototype.id,
  BuzonRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Buzon, dataSource);
  }
}
