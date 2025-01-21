import { hasAsyncThrow } from 'has-throw';

import { WorkspaceUsers } from '@domain/collections/workspace-user.collection';
import { User } from '@domain/entities/user.entity';
import { Workspace } from '@domain/entities/workspace.entity';
import { AssignWorkspaceByIdService } from '@domain/services/assign-workspace-by-id.service';
import { D1UserRepository } from '@infrastructure/repositories/d1/user.repository.mock';
import { D1WorkspaceUserRepository } from '@infrastructure/repositories/d1/workspace-user.repository.mock';
import { D1WorkspaceRepository } from '@infrastructure/repositories/d1/workspace.repository.mock';
import { mockedUserId } from '@test/fixtures/user.fixture';
import { mockedWorkspace, mockedWorkspaceId } from '@test/fixtures/workspace.fixture';
import { createContainer } from '@test/inversify.config';

const container = createContainer();

beforeEach(() => {
  container.snapshot();
  container.bind<AssignWorkspaceByIdService>(AssignWorkspaceByIdService).toSelf();
});

afterEach(() => {
  container.restore();
});

describe('Positive', () => {
  it('If the workspace is assigned successfully', async () => {
    const spy = vi.spyOn(D1WorkspaceUserRepository.prototype, 'findByUserId').mockResolvedValue(WorkspaceUsers.from([]));
    const workspace = await container.get(AssignWorkspaceByIdService).execute({
      userId: mockedUserId.toString(),
      workspaceId: mockedWorkspaceId.toString(),
    });
    expect(workspace).toEqual(mockedWorkspace);
    spy.mockRestore();
  });
});

describe('Negative', () => {
  it('If the user is not found', async () => {
    const spy = vi.spyOn(D1UserRepository.prototype, 'findById').mockResolvedValue(null);
    await expect(hasAsyncThrow(async () => await container.get(AssignWorkspaceByIdService).execute({
      userId: mockedUserId.toString(),
      workspaceId: mockedWorkspaceId.toString(),
    }))).resolves.toStrictEqual(true);
    spy.mockRestore();
  });

  it('If the user is deleted', async () => {
    const spy = vi.spyOn(User.prototype, 'isDeleted').mockResolvedValue(true);
    await expect(hasAsyncThrow(async () => await container.get(AssignWorkspaceByIdService).execute({
      userId: mockedUserId.toString(),
      workspaceId: mockedWorkspaceId.toString(),
    }))).resolves.toStrictEqual(true);
    spy.mockRestore();
  });

  it('If the user is not verified', async () => {
    const spy = vi.spyOn(User.prototype, 'isVerified').mockResolvedValue(false);
    await expect(hasAsyncThrow(async () => await container.get(AssignWorkspaceByIdService).execute({
      userId: mockedUserId.toString(),
      workspaceId: mockedWorkspaceId.toString(),
    }))).resolves.toStrictEqual(true);
    spy.mockRestore();
  });

  it('If the workspace is not found', async () => {
    const spy = vi.spyOn(D1WorkspaceRepository.prototype, 'findById').mockResolvedValue(null);
    await expect(hasAsyncThrow(async () => await container.get(AssignWorkspaceByIdService).execute({
      userId: mockedUserId.toString(),
      workspaceId: mockedWorkspaceId.toString(),
    }))).resolves.toStrictEqual(true);
    spy.mockRestore();
  });

  it('If the workspace assignment failed due to deleted workspace', async () => {
    const spy = vi.spyOn(Workspace.prototype, 'isDeleted').mockResolvedValue(true);
    await expect(hasAsyncThrow(async () => await container.get(AssignWorkspaceByIdService).execute({
      userId: mockedUserId.toString(),
      workspaceId: mockedWorkspaceId.toString(),
    }))).resolves.toStrictEqual(true);
    spy.mockRestore();
  });

  it('If the user is already assigned to the workspace', async () => {
    await expect(hasAsyncThrow(async () => await container.get(AssignWorkspaceByIdService).execute({
      userId: mockedUserId.toString(),
      workspaceId: mockedWorkspaceId.toString(),
    }))).resolves.toStrictEqual(true);
  });
});
