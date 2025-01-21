import { WorkspaceUsers } from '@domain/collections/workspace-user.collection';
import { GetUserJoinedWorkspacesService } from '@domain/services/get-user-joined-workspaces.service';
import { D1WorkspaceUserRepository } from '@infrastructure/repositories/d1/workspace-user.repository.mock';
import { mockedUserId } from '@test/fixtures/user.fixture';
import { mockedWorkspace } from '@test/fixtures/workspace.fixture';
import { createContainer } from '@test/inversify.config';

const container = createContainer();

beforeEach(() => {
  container.snapshot();
  container.bind<GetUserJoinedWorkspacesService>(GetUserJoinedWorkspacesService).toSelf();
});

afterEach(() => {
  container.restore();
});

describe('Positive', () => {
  it('If the user is joined some workspaces', async () => {
    const workspaces = await container.get(GetUserJoinedWorkspacesService).execute({
      id: mockedUserId,
    });
    expect(workspaces).toEqual([mockedWorkspace]);
  });
});

describe('Negative', () => {
  it('If the user is not joined any workspace', async () => {
    const spy = vi.spyOn(D1WorkspaceUserRepository.prototype, 'findByUserId').mockResolvedValue(WorkspaceUsers.from([]));
    const workspaces = await container.get(GetUserJoinedWorkspacesService).execute({
      id: mockedUserId,
    });
    expect(workspaces).toEqual([]);
    spy.mockRestore();
  });
});
