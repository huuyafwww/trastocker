import { injectable, inject } from 'inversify';

import { WorkspaceUser } from '@domain/entities/workspace-user.entity';
import { Workspace } from '@domain/entities/workspace.entity';
import { UserRepository } from '@domain/repositories/user.repository';
import { WorkspaceUserRepository } from '@domain/repositories/workspace-user.repository';
import { WorkspaceRepository } from '@domain/repositories/workspace.repository';
import { Service } from '@domain/services/service';
import { UserId } from '@domain/value-objects/user/id.value-object';
import { WorkspaceInviteCode } from '@domain/value-objects/workspace/invite-code.value-object';

export type AssignWorkspaceByInviteCodeServiceProps = {
  userId: string;
  inviteCode: string;
};

export type AssignWorkspaceByInviteCodeServiceOutput = Workspace | null;

@injectable()
export class AssignWorkspaceByInviteCodeService implements Service<AssignWorkspaceByInviteCodeServiceProps, AssignWorkspaceByInviteCodeServiceOutput> {
  constructor(
    @inject(UserRepository) private userRepository: UserRepository,
    @inject(WorkspaceRepository) private workspaceRepository: WorkspaceRepository,
    @inject(WorkspaceUserRepository) private workspaceUserRepository: WorkspaceUserRepository,
  ) {
  }

  async execute(props: AssignWorkspaceByInviteCodeServiceProps): Promise<AssignWorkspaceByInviteCodeServiceOutput> {
    if (!props.inviteCode) throw new Error('Invite code or workspace ID is required');
    if (!props.userId) throw new Error('User ID is required');

    const inviteCode = WorkspaceInviteCode.fromString(props.inviteCode);
    const workspace = await this.workspaceRepository.findByInviteCode(inviteCode);
    if (!workspace) throw new Error('Workspace not found');
    if (workspace.isDeleted()) throw new Error('Workspace is deleted');

    const user = await this.userRepository.findById(UserId.fromString(props.userId));
    if (!user) throw new Error('User not found');
    if (user.isDeleted()) throw new Error('User is deleted');
    if (!user.isVerified()) throw new Error('User is not verified');

    const workspaceUsers = await this.workspaceUserRepository.findByUserId(user.id);
    if (workspaceUsers.filterActive().filterByWorkspaceId(workspace.id).toEntities().length > 0) throw new Error('User already assigned to workspace');

    const workspaceUser = await this.workspaceUserRepository.save(WorkspaceUser.create({
      userId: user.id,
      workspaceId: workspace.id,
    }));
    if (!workspaceUser) throw new Error('Failed to assign user to workspace');
    return workspace;
  }
}
