import { injectable } from 'inversify';

import { UserToken } from '@domain/entities/user-token.entity';
import { User } from '@domain/entities/user.entity';
import { mockedUserToken } from '@test/fixtures/user-token.fixture';
import { mockedUser } from '@test/fixtures/user.fixture';

export type UserLoginUseCaseOutput = {
  user: User;
  userToken: UserToken;
};

@injectable()
export class UserLoginUseCase {
  async execute(): Promise<UserLoginUseCaseOutput> {
    return new Promise(resolve => resolve({
      user: mockedUser,
      userToken: mockedUserToken,
    }));
  }
}
