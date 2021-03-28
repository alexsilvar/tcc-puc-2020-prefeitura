import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CidadaopostgresDataSource} from '../datasources';
import {Emailcpf, EmailcpfRelations} from '../models';

export class EmailcpfRepository extends DefaultCrudRepository<
  Emailcpf,
  typeof Emailcpf.prototype.id,
  EmailcpfRelations
> {
  constructor(
    @inject('datasources.cidadaopostgres') dataSource: CidadaopostgresDataSource,
  ) {
    super(Emailcpf, dataSource);
  }
}
