import { hasAsyncThrow } from 'has-throw';
import { err } from 'neverthrow';

import { INJECT_KEY } from '@constants/inject-key';
import { User } from '@domain/entities/user.entity';
import { ResendEmailNotification } from '@infrastructure/notifications/resend/email.notification.mock';
import { D1UserRepository } from '@infrastructure/repositories/d1/user.repository.mock';
import { mockedUser } from '@test/fixtures/user.fixture';
import { createContainer } from '@test/inversify.config';

import { VerifyUserService } from './verify-user.service';

const container = createContainer();

beforeEach(() => {
  container.snapshot();
  container.rebind<VerifyUserService>(INJECT_KEY.VerifyUserService).to(VerifyUserService);
});

afterEach(() => {
  container.restore();
});

describe('Positive', () => {
  it('If the user exists', async () => {
    const user = await container.get<VerifyUserService>(INJECT_KEY.VerifyUserService).execute({
      verifyToken: mockedUser.verifyToken.toString(),
    });
    expect(user).toEqual(mockedUser);
  });
});

describe('Negative', () => {
  it('If the user does not exist', async () => {
    const spy = vi.spyOn(D1UserRepository.prototype, 'findByVerifyToken').mockResolvedValue(null);
    await expect(hasAsyncThrow(async () => await container.get<VerifyUserService>(INJECT_KEY.VerifyUserService).execute({
      verifyToken: 'invalid-token',
    }))).resolves.toStrictEqual(true);
    spy.mockRestore();
  });

  it('If the user already verified', async () => {
    const spy = vi.spyOn(User.prototype, 'canVerify').mockResolvedValue(false);
    await expect(hasAsyncThrow(async () => await container.get<VerifyUserService>(INJECT_KEY.VerifyUserService).execute({
      verifyToken: mockedUser.verifyToken.toString(),
    }))).resolves.toStrictEqual(true);
    spy.mockRestore();
  });

  it('If the email notification dispatch fails', async () => {
    const spy = vi.spyOn(ResendEmailNotification.prototype, 'dispatch').mockResolvedValue(err(new Error('Failed to send email')));
    await expect(hasAsyncThrow(async () => await container.get<VerifyUserService>(INJECT_KEY.VerifyUserService).execute({
      verifyToken: mockedUser.verifyToken.toString(),
    }))).resolves.toStrictEqual(true);
    spy.mockRestore();
  });
});
