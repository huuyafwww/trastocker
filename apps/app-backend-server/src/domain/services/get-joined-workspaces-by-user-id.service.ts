import { injectable, inject } from 'inversify';

import { Workspace } from '@domain/entities/workspace.entity';
import { WorkspaceUserRepository } from '@domain/repositories/workspace-user.repository';
import { WorkspaceRepository } from '@domain/repositories/workspace.repository';
import { Service } from '@domain/services/service';
import { UserId } from '@domain/value-objects/user/id.value-object';

export type GetJoinedWorkspacesByUserIdServiceProps = {
  id: UserId;
};

export type GetJoinedWorkspacesByUserIdServiceOutput = Workspace[];

@injectable()
export class GetJoinedWorkspacesByUserIdService implements Service<GetJoinedWorkspacesByUserIdServiceProps, GetJoinedWorkspacesByUserIdServiceOutput> {
  constructor(
    @inject(WorkspaceRepository) private workspaceRepository: WorkspaceRepository,
    @inject(WorkspaceUserRepository) private workspaceUserRepository: WorkspaceUserRepository,
  ) {
  }

  async execute(props: GetJoinedWorkspacesByUserIdServiceProps): Promise<GetJoinedWorkspacesByUserIdServiceOutput> {
    const workspaceUsers = await this.workspaceUserRepository.findByUserId(props.id);
    const workspaces = await this.workspaceRepository.findByIds(workspaceUsers.filterActive().pickWorkspaceIds());
    return workspaces.filterActive().toEntities();
  }
}
