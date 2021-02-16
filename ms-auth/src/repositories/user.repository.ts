import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UserspostgresDataSource} from '../datasources';
import {User, UserRelations} from '../models';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(
    @inject('datasources.userspostgres') dataSource: UserspostgresDataSource,
  ) {
    super(User, dataSource);
  }
}
