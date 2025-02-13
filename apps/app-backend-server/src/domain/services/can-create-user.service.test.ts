import { D1UserRepository } from '@infrastructure/repositories/d1/user.repository.mock';
import { mockedUser } from '@test/fixtures/user.fixture';
import { createContainer } from '@test/inversify.config';

import { CanCreateUserService } from './can-create-user.service';

const container = createContainer();

beforeEach(() => {
  container.snapshot();
  container.bind<CanCreateUserService>(CanCreateUserService).toSelf();
});

afterEach(() => {
  container.restore();
});

describe('Positive', () => {
  it('If the user can create ', async () => {
    const spy = vi.spyOn(D1UserRepository.prototype, 'findByEmail').mockResolvedValue(null);
    const user = await container.get(CanCreateUserService).execute({
      email: mockedUser.email.toString(),
    });
    expect(user).toEqual(true);
    spy.mockRestore();
  });
});

describe('Negative', () => {
  it('If the user cannot create', async () => {
    const user = await container.get(CanCreateUserService).execute({
      email: mockedUser.email.toString(),
    });
    expect(user).toEqual(false);
  });
});
