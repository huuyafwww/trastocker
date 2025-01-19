import { injectable } from 'inversify';

import { Workspace } from '@domain/entities/workspace.entity';
import { Service } from '@domain/services/service';
import { mockedWorkspace } from '@test/fixtures/workspace.fixture';

export type CreateWorkspaceByNameServiceOutput = Workspace | null;

@injectable()
export class CreateWorkspaceByNameService implements Service<{}, CreateWorkspaceByNameServiceOutput> {
  constructor() {
  }

  async execute(): Promise<CreateWorkspaceByNameServiceOutput> {
    return new Promise(resolve => resolve(mockedWorkspace));
  }
}
