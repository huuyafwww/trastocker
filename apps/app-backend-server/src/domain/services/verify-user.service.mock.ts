import { injectable } from 'inversify';

import { User } from '@domain/entities/user.entity';
import { Service } from '@domain/services/service';
import { mockedUser } from '@test/fixtures/user.fixture';

export type VerifyUserServiceProps = {
  verifyToken: string;
};

export type VerifyUserServiceOutput = User;

@injectable()
export class VerifyUserService implements Service<VerifyUserServiceProps, VerifyUserServiceOutput> {
  async execute(): Promise<VerifyUserServiceOutput> {
    return new Promise(resolve => resolve(mockedUser));
  }
}
