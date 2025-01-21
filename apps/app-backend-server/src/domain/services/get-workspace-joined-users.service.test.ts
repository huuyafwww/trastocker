import { WorkspaceUsers } from '@domain/collections/workspace-user.collection';
import { GetWorkspaceJoinedUsersService } from '@domain/services/get-workspace-joined-users.service';
import { D1WorkspaceUserRepository } from '@infrastructure/repositories/d1/workspace-user.repository.mock';
import { mockedUser } from '@test/fixtures/user.fixture';
import { mockedWorkspaceId } from '@test/fixtures/workspace.fixture';
import { createContainer } from '@test/inversify.config';

const container = createContainer();

beforeEach(() => {
  container.snapshot();
  container.bind<GetWorkspaceJoinedUsersService>(GetWorkspaceJoinedUsersService).toSelf();
});

afterEach(() => {
  container.restore();
});

describe('Positive', () => {
  it('If the user is joined some workspaces', async () => {
    const users = await container.get(GetWorkspaceJoinedUsersService).execute({
      id: mockedWorkspaceId,
    });
    expect(users).toEqual([mockedUser]);
  });
});

describe('Negative', () => {
  it('If the user is not joined any workspace', async () => {
    const spy = vi.spyOn(D1WorkspaceUserRepository.prototype, 'findByWorkspaceId').mockResolvedValue(WorkspaceUsers.from([]));
    const users = await container.get(GetWorkspaceJoinedUsersService).execute({
      id: mockedWorkspaceId,
    });
    expect(users).toEqual([]);
    spy.mockRestore();
  });
});
