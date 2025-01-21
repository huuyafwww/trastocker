import { hasAsyncThrow } from 'has-throw';

import { D1WorkspaceRepository } from '@infrastructure/repositories/d1/workspace.repository.mock';
import { mockedWorkspace } from '@test/fixtures/workspace.fixture';
import { mockedWorkspaceName } from '@test/fixtures/workspace.fixture';
import { createContainer } from '@test/inversify.config';

import { CreateWorkspaceByNameService } from './create-workspace-by-name.service';

const container = createContainer();

beforeEach(() => {
  container.snapshot();
  container.bind<CreateWorkspaceByNameService>(CreateWorkspaceByNameService).toSelf();
});

afterEach(() => {
  container.restore();
});

describe('Positive', () => {
  it('If the workspace is created successfully', async () => {
    const workspace = await container.get(CreateWorkspaceByNameService).execute({
      name: mockedWorkspaceName.toString(),
    });
    expect(workspace).toEqual(mockedWorkspace);
  });
});

describe('Negative', () => {
  it('If the workspace creation failed', async () => {
    const spy = vi.spyOn(D1WorkspaceRepository.prototype, 'save').mockRejectedValue(new Error());
    await expect(hasAsyncThrow(async () => await container.get(CreateWorkspaceByNameService).execute({
      name: mockedWorkspaceName.toString(),
    }))).resolves.toStrictEqual(true);
    spy.mockRestore();
  });
});
