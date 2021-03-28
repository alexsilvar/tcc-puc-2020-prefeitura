import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {CidadaopostgresDataSource} from '../datasources';
import {Email, EmailRelations, CpfCnpj} from '../models';
import {CpfCnpjRepository} from './cpf-cnpj.repository';

export class EmailRepository extends DefaultCrudRepository<
  Email,
  typeof Email.prototype.email,
  EmailRelations
> {

  public readonly cpfCnpjs: HasManyRepositoryFactory<CpfCnpj, typeof Email.prototype.email>;

  constructor(
    @inject('datasources.cidadaopostgres') dataSource: CidadaopostgresDataSource, @repository.getter('CpfCnpjRepository') protected cpfCnpjRepositoryGetter: Getter<CpfCnpjRepository>,
  ) {
    super(Email, dataSource);
    this.cpfCnpjs = this.createHasManyRepositoryFactoryFor('cpfCnpjs', cpfCnpjRepositoryGetter,);
    this.registerInclusionResolver('cpfCnpjs', this.cpfCnpjs.inclusionResolver);
  }
}
