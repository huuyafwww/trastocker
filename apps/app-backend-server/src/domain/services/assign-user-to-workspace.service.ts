import { injectable, inject } from 'inversify';

import { WorkspaceUser } from '@domain/entities/workspace-user.entity';
import { UserRepository } from '@domain/repositories/user.repository';
import { WorkspaceUserRepository } from '@domain/repositories/workspace-user.repository';
import { WorkspaceRepository } from '@domain/repositories/workspace.repository';
import { Service } from '@domain/services/service';
import { UserId } from '@domain/value-objects/user/id.value-object';
import { WorkspaceId } from '@domain/value-objects/workspace/id.value-object';

export type AssignUserToWorkspaceServiceProps = {
  userId: string;
  workspaceId: string;
};

export type AssignUserToWorkspaceServiceOutput = WorkspaceUser | null;

@injectable()
export class AssignUserToWorkspaceService implements Service<AssignUserToWorkspaceServiceProps, AssignUserToWorkspaceServiceOutput> {
  constructor(
    @inject(UserRepository) private userRepository: UserRepository,
    @inject(WorkspaceRepository) private workspaceRepository: WorkspaceRepository,
    @inject(WorkspaceUserRepository) private workspaceUserRepository: WorkspaceUserRepository,
  ) {
  }

  async execute(props: AssignUserToWorkspaceServiceProps): Promise<AssignUserToWorkspaceServiceOutput> {
    const user = await this.userRepository.findById(UserId.fromString(props.userId));
    if (!user) throw new Error('User not found');
    if (user.isDeleted()) throw new Error('User is deleted');
    if (!user.isVerified()) throw new Error('User is not verified');

    const workspace = await this.workspaceRepository.findById(WorkspaceId.fromString(props.workspaceId));
    if (!workspace) throw new Error('Workspace not found');
    if (workspace.isDeleted()) throw new Error('Workspace is deleted');

    const workspaceUsers = await this.workspaceUserRepository.findByUserId(user.id);
    if (workspaceUsers.toEntities().length > 0) throw new Error('User already assigned to workspace');

    const workspaceUser = WorkspaceUser.create({
      userId: user.id,
      workspaceId: workspace.id,
    });
    return await this.workspaceUserRepository.save(workspaceUser);
  }
}
