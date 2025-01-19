import { injectable } from 'inversify';

import { Users } from '@domain/collections/user.collection';
import { User } from '@domain/entities/user.entity';
import { UserRepository } from '@domain/repositories/user.repository';
import { UserId } from '@domain/value-objects/user/id.value-object';
import { mockedUser } from '@test/fixtures/user.fixture';

@injectable()
export class D1UserRepository implements UserRepository {
  async save(): Promise<User> {
    return new Promise(resolve => resolve(mockedUser));
  }

  async findById(): Promise<User | null> {
    return new Promise(resolve => resolve(mockedUser));
  }

  async findByIds(ids: UserId[]): Promise<Users> {
    if (ids.length === 0) return Users.from([]);
    return new Promise(resolve => resolve(Users.from([mockedUser])));
  }

  async findByEmail(): Promise<User | null> {
    return new Promise(resolve => resolve(mockedUser));
  }
}
