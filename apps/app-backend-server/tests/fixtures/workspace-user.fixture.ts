import { WorkspaceUser } from '@domain/entities/workspace-user.entity';
import { WorkspaceUserId } from '@domain/value-objects/workspace-user/id.value-object';

import { mockedUserId } from './user.fixture';
import { mockedWorkspaceId } from './workspace.fixture';

export const mockedWorkspaceUserId = WorkspaceUserId.generate();

export const mockedWorkspaceUserData = {
  id: mockedWorkspaceUserId,
  userId: mockedUserId,
  workspaceId: mockedWorkspaceId,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};
export const mockedWorkspaceUser = new WorkspaceUser(mockedWorkspaceUserData);
