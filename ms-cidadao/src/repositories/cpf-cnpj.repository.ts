import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {CidadaopostgresDataSource} from '../datasources';
import {CpfCnpj, CpfCnpjRelations, Iptuitr} from '../models';
import {IptuitrRepository} from './iptuitr.repository';

export class CpfCnpjRepository extends DefaultCrudRepository<
  CpfCnpj,
  typeof CpfCnpj.prototype.cpfcnpj,
  CpfCnpjRelations
> {

  public readonly iptuitrs: HasManyRepositoryFactory<Iptuitr, typeof CpfCnpj.prototype.cpfcnpj>;

  constructor(
    @inject('datasources.cidadaopostgres') dataSource: CidadaopostgresDataSource, @repository.getter('IptuitrRepository') protected iptuitrRepositoryGetter: Getter<IptuitrRepository>,
  ) {
    super(CpfCnpj, dataSource);
    this.iptuitrs = this.createHasManyRepositoryFactoryFor('iptuitrs', iptuitrRepositoryGetter,);
    this.registerInclusionResolver('iptuitrs', this.iptuitrs.inclusionResolver);
  }
}
