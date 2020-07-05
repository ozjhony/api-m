import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

/*const config = {
  name: 'mongodb',
  connector: 'mongodb',
  url: 'mongodb+srv://user_manga_db:moErZDu4XsvL3v3C@cluster0-b9mfd.mongodb.net/UserMangaDb?retryWrites=true&w=majority',
  host: 'cluster0-b9mfd.mongodb.net',
  port: 27017,
  user: 'user_manga_db',
  password: 'moErZDu4XsvL3v3C',
  database: 'UserMangaDb',
  useNewUrlParser: true
};**/

const config = {
  name: 'mongodb',
  connector: 'mongodb',
  url: 'mongodb://localhost:27017/UserMangaDb',
  host: 'localhost',
  port: 27017,
  user: '',
  password: '',
  database: 'UserMangaDb',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongodbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongodb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongodb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
