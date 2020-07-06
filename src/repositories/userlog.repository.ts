import {DefaultCrudRepository} from '@loopback/repository';
import {Userlog, UserlogRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserlogRepository extends DefaultCrudRepository<
  Userlog,
  typeof Userlog.prototype.id,
  UserlogRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Userlog, dataSource);
  }
}
