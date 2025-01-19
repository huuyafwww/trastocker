import { injectable } from 'inversify';

import { Workspace } from '@domain/entities/workspace.entity';
import { Service } from '@domain/services/service';
import { mockedWorkspace } from '@test/fixtures/workspace.fixture';

export type GetUserJoinedWorkspacesServiceOutput = Workspace[];

@injectable()
export class GetUserJoinedWorkspacesService implements Service<{}, GetUserJoinedWorkspacesServiceOutput> {
  constructor() {
  }

  async execute(): Promise<GetUserJoinedWorkspacesServiceOutput> {
    return new Promise(resolve => resolve([mockedWorkspace]));
  }
}
