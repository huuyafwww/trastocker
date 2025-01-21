import { injectable } from 'inversify';

import { User } from '@domain/entities/user.entity';
import { Service } from '@domain/services/service';
import { mockedUser } from '@test/fixtures/user.fixture';

export type GetWorkspaceJoinedUsersServiceOutput = User[];

@injectable()
export class GetWorkspaceJoinedUsersService implements Service<{}, GetWorkspaceJoinedUsersServiceOutput> {
  constructor() {
  }

  async execute(): Promise<GetWorkspaceJoinedUsersServiceOutput> {
    return new Promise(resolve => resolve([mockedUser]));
  }
}
