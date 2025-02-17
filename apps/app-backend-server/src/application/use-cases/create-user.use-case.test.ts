import { hasAsyncThrow } from 'has-throw';

import { INJECT_KEYS } from '@constants/inject-key';
import { CanCreateUserService } from '@domain/services/can-create-user.service.mock';
import { mockedUser, mockedUserPasswordRaw } from '@test/fixtures/user.fixture';
import { createContainer } from '@test/inversify.config';

import { CreateUserUseCase } from './create-user.use-case';

const container = createContainer();

beforeEach(() => {
  container.snapshot();
  container.rebind<CreateUserUseCase>(INJECT_KEYS.CreateUserUseCase).to(CreateUserUseCase);
});

afterEach(() => {
  container.restore();
});

describe('Positive', () => {
  it('If the user created ', async () => {
    const createUserUseCase = container.get<CreateUserUseCase>(INJECT_KEYS.CreateUserUseCase);
    const user = await createUserUseCase.execute({
      name: mockedUser.name.toString(),
      email: mockedUser.email.toString(),
      password: mockedUserPasswordRaw,
    });
    expect(user).toEqual(user);
  });
});

describe('Negative', () => {
  it('If the user cannot create', async () => {
    const spy = vi.spyOn(CanCreateUserService.prototype, 'execute').mockResolvedValue(false);
    const createUserUseCase = container.get<CreateUserUseCase>(INJECT_KEYS.CreateUserUseCase);
    await expect(hasAsyncThrow(async () => await createUserUseCase.execute({
      name: mockedUser.name.toString(),
      email: mockedUser.email.toString(),
      password: mockedUserPasswordRaw,
    }))).resolves.toStrictEqual(true);

    spy.mockRestore();
  });
});
