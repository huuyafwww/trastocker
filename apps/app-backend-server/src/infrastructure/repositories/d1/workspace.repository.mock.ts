import { injectable } from 'inversify';

import { Workspaces } from '@domain/collections/workspace.collection';
import { Workspace } from '@domain/entities/workspace.entity';
import { WorkspaceRepository } from '@domain/repositories/workspace.repository';
import { WorkspaceId } from '@domain/value-objects/workspace/id.value-object';
import { mockedWorkspace } from '@test/fixtures/workspace.fixture';

@injectable()
export class D1WorkspaceRepository implements WorkspaceRepository {
  constructor() {}

  async save(): Promise<Workspace> {
    return new Promise(resolve => resolve(mockedWorkspace));
  }

  async findById(): Promise<Workspace | null> {
    return new Promise(resolve => resolve(mockedWorkspace));
  }

  async findByIds(ids: WorkspaceId[]): Promise<Workspaces> {
    if (ids.length === 0) return Workspaces.from([]);
    return new Promise(resolve => resolve(Workspaces.from([mockedWorkspace])));
  }

  async findByInviteCode(): Promise<Workspace | null> {
    return new Promise(resolve => resolve(mockedWorkspace));
  }
}
