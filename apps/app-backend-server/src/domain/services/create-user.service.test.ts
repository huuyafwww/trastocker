import { hasAsyncThrow } from 'has-throw';
import { err } from 'neverthrow';

import { INJECT_KEYS } from '@constants/inject-key';
import { ResendEmailNotification } from '@infrastructure/notifications/resend/email.notification.mock';
import { mockedUser } from '@test/fixtures/user.fixture';
import { mockedUserPasswordRaw } from '@test/fixtures/user.fixture';
import { createContainer } from '@test/inversify.config';

import { CreateUserService } from './create-user.service';

const container = createContainer();

beforeEach(() => {
  container.snapshot();
  container.rebind<CreateUserService>(INJECT_KEYS.CreateUserService).to(CreateUserService);
});

afterEach(() => {
  container.restore();
});

describe('Positive', () => {
  it('If the user can create ', async () => {
    const user = await container.get<CreateUserService>(INJECT_KEYS.CreateUserService).execute({
      name: mockedUser.name.toString(),
      email: mockedUser.email.toString(),
      password: mockedUserPasswordRaw,
    });
    expect(user).toEqual(user);
  });
});

describe('Negative', () => {
  it('If the email notification dispatch fails', async () => {
    const spy = vi.spyOn(ResendEmailNotification.prototype, 'dispatch').mockResolvedValue(err(new Error('Failed to send email')));
    await expect(hasAsyncThrow(async () => await container.get<CreateUserService>(INJECT_KEYS.CreateUserService).execute({
      name: mockedUser.name.toString(),
      email: mockedUser.email.toString(),
      password: mockedUserPasswordRaw,
    }))).resolves.toStrictEqual(true);

    spy.mockRestore();
  });
});
