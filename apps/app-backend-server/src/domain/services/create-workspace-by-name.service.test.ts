import { D1WorkspaceRepository } from '@infrastructure/repositories/d1/workspace.repository.mock';
import { mockedWorkspace } from '@test/fixtures/workspace.fixture';
import { mockedWorkspaceName } from '@test/fixtures/workspace.fixture';
import { hasAsyncThrow } from '@test/helpers/has-async-throw';
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
  it('If the workspace creation failed', () => {
    const spy = vi.spyOn(D1WorkspaceRepository.prototype, 'save').mockRejectedValue(new Error());
    expect(hasAsyncThrow(async () => await container.get(CreateWorkspaceByNameService).execute({
      name: mockedWorkspaceName.toString(),
    }))).toBeTruthy();
    spy.mockRestore();
  });
});
