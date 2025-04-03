import { injectable } from 'inversify';

import { mockedUser } from '@test/fixtures/user.fixture';

import type { User } from '@domain/entities/user.entity';

export type CreateUserUseCaseOutput = Promise<User>;

@injectable()
export class CreateUserUseCase {
  async execute(): CreateUserUseCaseOutput {
    return new Promise(resolve => resolve(mockedUser));
  }
}
