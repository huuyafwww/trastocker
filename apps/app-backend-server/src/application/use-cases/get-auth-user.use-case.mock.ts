import { injectable } from 'inversify';

import { mockedUser } from '@test/fixtures/user.fixture';

import type { User } from '@domain/entities/user.entity';

export type GetAuthUserUseCaseOutput = Promise<User>;

@injectable()
export class GetAuthUserUseCase {
  async execute(): GetAuthUserUseCaseOutput {
    return new Promise(resolve => resolve(mockedUser));
  }
}
