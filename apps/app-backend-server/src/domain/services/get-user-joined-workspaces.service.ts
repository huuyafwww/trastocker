import { injectable, inject } from 'inversify';

import { Workspace } from '@domain/entities/workspace.entity';
import { WorkspaceUserRepository } from '@domain/repositories/workspace-user.repository';
import { WorkspaceRepository } from '@domain/repositories/workspace.repository';
import { Service } from '@domain/services/service';
import { UserId } from '@domain/value-objects/user/id.value-object';

export type GetUserJoinedWorkspacesServiceProps = {
  id: UserId;
};

export type GetUserJoinedWorkspacesServiceOutput = Workspace[];

@injectable()
export class GetUserJoinedWorkspacesService implements Service<GetUserJoinedWorkspacesServiceProps, GetUserJoinedWorkspacesServiceOutput> {
  constructor(
    @inject(WorkspaceRepository) private workspaceRepository: WorkspaceRepository,
    @inject(WorkspaceUserRepository) private workspaceUserRepository: WorkspaceUserRepository,
  ) {
  }

  async execute(props: GetUserJoinedWorkspacesServiceProps): Promise<GetUserJoinedWorkspacesServiceOutput> {
    const workspaceUsers = await this.workspaceUserRepository.findByUserId(props.id);
    const workspaces = await this.workspaceRepository.findByIds(workspaceUsers.filterActive().pickWorkspaceIds());
    return workspaces.filterActive().toEntities();
  }
}
