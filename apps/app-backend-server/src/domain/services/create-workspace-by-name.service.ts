import { injectable, inject } from 'inversify';

import { Workspace } from '@domain/entities/workspace.entity';
import { WorkspaceRepository } from '@domain/repositories/workspace.repository';
import { Service } from '@domain/services/service';
import { WorkspaceInviteCode } from '@domain/value-objects/workspace/invite-code.value-object';
import { WorkspaceName } from '@domain/value-objects/workspace/name.value-object';

export type CreateWorkspaceByNameServiceProps = {
  name: string;
};

export type CreateWorkspaceByNameServiceOutput = Workspace | null;

@injectable()
export class CreateWorkspaceByNameService implements Service<CreateWorkspaceByNameServiceProps, CreateWorkspaceByNameServiceOutput> {
  constructor(
    @inject(WorkspaceRepository) private workspaceRepository: WorkspaceRepository,
  ) {
  }

  async execute(props: CreateWorkspaceByNameServiceProps): Promise<CreateWorkspaceByNameServiceOutput> {
    const workspace = Workspace.create({
      name: WorkspaceName.fromString(props.name),
      inviteCode: WorkspaceInviteCode.generate(),
    });
    return await this.workspaceRepository.save(workspace);
  }
}
