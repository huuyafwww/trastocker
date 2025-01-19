import { injectable } from 'inversify';

import { Workspace } from '@domain/entities/workspace.entity';
import { Service } from '@domain/services/service';
import { mockedWorkspace } from '@test/fixtures/workspace.fixture';

export type AssignWorkspaceByIdServiceOutput = Workspace | null;

@injectable()
export class AssignWorkspaceByIdService implements Service<{}, AssignWorkspaceByIdServiceOutput> {
  constructor() {
  }

  async execute(): Promise<AssignWorkspaceByIdServiceOutput> {
    return new Promise(resolve => resolve(mockedWorkspace));
  }
}
