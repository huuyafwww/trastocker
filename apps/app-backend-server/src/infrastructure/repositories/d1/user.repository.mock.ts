import { injectable } from 'inversify';

import { Users } from '@domain/collections/user.collection';
import { User } from '@domain/entities/user.entity';
import { UserRepository } from '@domain/repositories/user.repository';
import { UserEmail } from '@domain/value-objects/user/email.value-object';
import { UserId } from '@domain/value-objects/user/id.value-object';
import { mockedUser } from '@test/fixtures/user.fixture';

@injectable()
export class D1UserRepository extends UserRepository {
  constructor() {
    super();
  }

  // eslint-disable-next-line
  async save(user: User): Promise<User> {
    return mockedUser;
  }

  // eslint-disable-next-line
  async findById(id: UserId): Promise<User | null> {
    return mockedUser;
  }

  // eslint-disable-next-line
  async findByIds(ids: UserId[]): Promise<Users> {
    return Users.from([mockedUser]);
  }

  // eslint-disable-next-line
  async findByEmail(email: UserEmail): Promise<User | null> {
    return mockedUser;
  }
}
