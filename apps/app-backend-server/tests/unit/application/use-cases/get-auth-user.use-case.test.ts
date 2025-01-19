import { GetAuthUserUseCase } from '@application/use-cases/get-auth-user.use-case';
import { UserId } from '@domain/value-objects/user/id.value-object';
import { UserTokenAccessToken } from '@domain/value-objects/user-token/access-token.value-object';
import { UserTokenRefreshToken } from '@domain/value-objects/user-token/refresh-token.value-object';
import { D1UserTokenRepository } from '@infrastructure/repositories/d1/user-token.repository.mock';
import { D1UserRepository } from '@infrastructure/repositories/d1/user.repository.mock';
import { mockedUser, mockedUserId, mockedUserEmail } from '@test/fixtures/user.fixture';
import { createContainer } from '@test/inversify.config';

const container = createContainer();

beforeEach(() => {
  container.snapshot();
  container.bind<GetAuthUserUseCase>(GetAuthUserUseCase).toSelf();
});

afterEach(() => {
  container.restore();
});

describe('Positive', () => {
  const accessToken = UserTokenAccessToken.generate({ userId: mockedUserId, email: mockedUserEmail });
  const refreshToken = UserTokenRefreshToken.generate({ userId: mockedUserId, email: mockedUserEmail });

  it('If the token is valid', async () => {
    const user = await container.get(GetAuthUserUseCase).execute({
      accessToken: accessToken.toString(),
      refreshToken: refreshToken.toString(),
    });
    expect(user).toEqual(mockedUser);
  });

  it('If the access token is expired', async () => {
    const spy = vi.spyOn(UserTokenAccessToken.prototype, 'canVerify').mockReturnValue(false);
    const user = await container.get(GetAuthUserUseCase).execute({
      accessToken: accessToken.toString(),
      refreshToken: refreshToken.toString(),
    });
    expect(user).toEqual(mockedUser);
    spy.mockRestore();
  });
});

describe('Negative', () => {
  const accessToken = UserTokenAccessToken.generate({ userId: mockedUserId, email: mockedUserEmail });
  const refreshToken = UserTokenRefreshToken.generate({ userId: mockedUserId, email: mockedUserEmail });

  it('If the access token is invalid', async () => {
    const spy = vi.spyOn(UserTokenAccessToken.prototype, 'decode').mockReturnValue({
      userId: UserId.generate(),
      email: mockedUserEmail,
    });
    await expect(container.get(GetAuthUserUseCase).execute({
      accessToken: accessToken.toString(),
      refreshToken: refreshToken.toString(),
    })).rejects.toThrow('Invalid access token');
    spy.mockRestore();
  });

  it('If the refresh token is invalid', async () => {
    const spy = vi.spyOn(UserTokenRefreshToken.prototype, 'decode').mockReturnValue({
      userId: UserId.generate(),
      email: mockedUserEmail,
    });
    await expect(container.get(GetAuthUserUseCase).execute({
      accessToken: accessToken.toString(),
      refreshToken: refreshToken.toString(),
    })).rejects.toThrow('Invalid refresh token');
    spy.mockRestore();
  });

  it('If the user is not found', async () => {
    const spy = vi.spyOn(D1UserRepository.prototype, 'findById').mockResolvedValue(null);
    await expect(container.get(GetAuthUserUseCase).execute({
      accessToken: accessToken.toString(),
      refreshToken: refreshToken.toString(),
    })).rejects.toThrow('User not found');
    spy.mockRestore();
  });

  it('If the user is not verified', async () => {
    const spy = vi.spyOn(mockedUser, 'isVerified').mockReturnValue(false);
    await expect(container.get(GetAuthUserUseCase).execute({
      accessToken: accessToken.toString(),
      refreshToken: refreshToken.toString(),
    })).rejects.toThrow('User is not active');
    spy.mockRestore();
  });

  it('If the user is deleted', async () => {
    const spy = vi.spyOn(mockedUser, 'isDeleted').mockReturnValue(true);
    await expect(container.get(GetAuthUserUseCase).execute({
      accessToken: accessToken.toString(),
      refreshToken: refreshToken.toString(),
    })).rejects.toThrow('User is not active');
    spy.mockRestore();
  });

  it('If the refresh token is expired', async () => {
    const spy1 = vi.spyOn(UserTokenAccessToken.prototype, 'canVerify').mockReturnValue(false);
    const spy2 = vi.spyOn(UserTokenRefreshToken.prototype, 'canVerify').mockReturnValue(false);
    await expect(container.get(GetAuthUserUseCase).execute({
      accessToken: accessToken.toString(),
      refreshToken: refreshToken.toString(),
    })).rejects.toThrow('Refresh token is expired');
    spy1.mockRestore();
    spy2.mockRestore();
  });

  it('If the refresh token is expired', async () => {
    const spy1 = vi.spyOn(UserTokenAccessToken.prototype, 'canVerify').mockReturnValue(false);
    const spy2 = vi.spyOn(UserTokenRefreshToken.prototype, 'canVerify').mockReturnValue(true);
    const spy3 = vi.spyOn(D1UserTokenRepository.prototype, 'findByUserId').mockResolvedValue(null);
    await expect(container.get(GetAuthUserUseCase).execute({
      accessToken: accessToken.toString(),
      refreshToken: refreshToken.toString(),
    })).rejects.toThrow('User token not found');
    spy1.mockRestore();
    spy2.mockRestore();
    spy3.mockRestore();
  });
});
