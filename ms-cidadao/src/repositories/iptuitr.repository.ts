import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CidadaopostgresDataSource} from '../datasources';
import {Iptuitr, IptuitrRelations} from '../models';

export class IptuitrRepository extends DefaultCrudRepository<
  Iptuitr,
  typeof Iptuitr.prototype.id,
  IptuitrRelations
> {
  constructor(
    @inject('datasources.cidadaopostgres') dataSource: CidadaopostgresDataSource,
  ) {
    super(Iptuitr, dataSource);
  }
}
