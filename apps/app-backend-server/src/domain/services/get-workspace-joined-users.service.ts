import { injectable, inject } from 'inversify';

import { User } from '@domain/entities/user.entity';
import { UserRepository } from '@domain/repositories/user.repository';
import { WorkspaceUserRepository } from '@domain/repositories/workspace-user.repository';
import { Service } from '@domain/services/service';
import { WorkspaceId } from '@domain/value-objects/workspace/id.value-object';

export type GetWorkspaceJoinedUsersServiceProps = {
  id: WorkspaceId;
};

export type GetWorkspaceJoinedUsersServiceOutput = User[];

@injectable()
export class GetWorkspaceJoinedUsersService implements Service<GetWorkspaceJoinedUsersServiceProps, GetWorkspaceJoinedUsersServiceOutput> {
  constructor(
    @inject(UserRepository) private userRepository: UserRepository,
    @inject(WorkspaceUserRepository) private workspaceUserRepository: WorkspaceUserRepository,
  ) {
  }

  async execute(props: GetWorkspaceJoinedUsersServiceProps): Promise<GetWorkspaceJoinedUsersServiceOutput> {
    const workspaceUsers = await this.workspaceUserRepository.findByWorkspaceId(props.id);
    const users = await this.userRepository.findByIds(workspaceUsers.filterActive().pickUserIds());
    return users.filterActive().toEntities();
  }
}
