import { injectable } from 'inversify';

import { Workspace } from '@domain/entities/workspace.entity';
import { Service } from '@domain/services/service';
import { mockedWorkspace } from '@test/fixtures/workspace.fixture';

export type AssignWorkspaceByInviteCodeServiceOutput = Workspace | null;

@injectable()
export class AssignWorkspaceByInviteCodeService implements Service<{}, AssignWorkspaceByInviteCodeServiceOutput> {
  constructor() {
  }

  async execute(): Promise<AssignWorkspaceByInviteCodeServiceOutput> {
    return new Promise(resolve => resolve(mockedWorkspace));
  }
}
