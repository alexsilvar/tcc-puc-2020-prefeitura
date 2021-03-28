import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';

const config = {
  name: 'cidadaopostgres',
  connector: 'postgresql',
  url: 'postgres://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_DATABASE
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class CidadaopostgresDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'cidadaopostgres';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.cidadaopostgres', { optional: true })
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
