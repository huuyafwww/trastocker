import { Workspace } from '@domain/entities/workspace.entity';
import { WorkspaceId } from '@domain/value-objects/workspace/id.value-object';
import { WorkspaceInviteCode } from '@domain/value-objects/workspace/invite-code.value-object';
import { WorkspaceName } from '@domain/value-objects/workspace/name.value-object';

export const mockedWorkspaceId = WorkspaceId.generate();
export const mockedWorkspaceName = WorkspaceName.fromString('workspace');
export const mockedWorkspaceInviteCode = WorkspaceInviteCode.generate();

export const mockedWorkspaceData = {
  id: mockedWorkspaceId,
  name: mockedWorkspaceName,
  inviteCode: mockedWorkspaceInviteCode,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};
export const mockedWorkspace = new Workspace(mockedWorkspaceData);
