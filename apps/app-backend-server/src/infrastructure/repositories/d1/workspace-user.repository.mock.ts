import { injectable } from 'inversify';

import { WorkspaceUsers } from '@domain/collections/workspace-user.collection';
import { WorkspaceUser } from '@domain/entities/workspace-user.entity';
import { WorkspaceUserRepository } from '@domain/repositories/workspace-user.repository';
import { WorkspaceUserId } from '@domain/value-objects/workspace-user/id.value-object';
import { Repository } from '@infrastructure/repositories/d1/repository';
import { mockedWorkspaceUser } from '@test/fixtures/workspace-user.fixture';

@injectable()
export class D1WorkspaceUserRepository extends Repository<WorkspaceUser, WorkspaceUserId> implements WorkspaceUserRepository {
  async save(): Promise<WorkspaceUser> {
    return new Promise(resolve => resolve(mockedWorkspaceUser));
  }

  async findById(): Promise<WorkspaceUser | null> {
    return new Promise(resolve => resolve(mockedWorkspaceUser));
  }

  async findByUserId(): Promise<WorkspaceUsers> {
    return new Promise(resolve => resolve(WorkspaceUsers.from([mockedWorkspaceUser])));
  }

  async findByWorkspaceId(): Promise<WorkspaceUsers> {
    return new Promise(resolve => resolve(WorkspaceUsers.from([mockedWorkspaceUser])));
  }
}
