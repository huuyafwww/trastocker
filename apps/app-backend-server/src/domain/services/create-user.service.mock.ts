import { injectable } from 'inversify';

import { User } from '@domain/entities/user.entity';
import { Service } from '@domain/services/service';
import { mockedUser } from '@test/fixtures/user.fixture';

export type CreateUserServiceOutput = User;

@injectable()
export class CreateUserService implements Service<{}, CreateUserServiceOutput> {
  async execute(): Promise<CreateUserServiceOutput> {
    return new Promise(resolve => resolve(mockedUser));
  }
}
