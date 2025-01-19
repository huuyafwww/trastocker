import { injectable } from 'inversify';

import { mockedUser } from '@test/fixtures/user.fixture';

import type { User } from '@domain/entities/user.entity';

@injectable()
export class GetAuthUserUseCase {
  async execute(): Promise<User> {
    return new Promise(resolve => resolve(mockedUser));
  }
}
