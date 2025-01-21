import ms from 'ms';

import { UserEmail } from '@domain/value-objects/user/email.value-object';
import { UserId } from '@domain/value-objects/user/id.value-object';
import { UserTokenRefreshToken } from '@domain/value-objects/user-token/refresh-token.value-object';

describe('isEqual', () => {
  const secret = 'test-secret';
  const expiresIn = '1h';
  const userId = UserId.generate();
  const email = UserEmail.fromString('test@test.com');

  beforeEach(() => {
    process.env.JWT_REFRESH_TOKEN_SECRET = secret;
    process.env.JWT_REFRESH_TOKEN_EXPIRES_IN = expiresIn;
  });

  it('should return true if the id is correct', () => {
    const userTokenRefreshToken1 = UserTokenRefreshToken.generate({ userId, email });
    const userTokenRefreshToken2 = UserTokenRefreshToken.generate({ userId, email });
    expect(userTokenRefreshToken1.isEqual(userTokenRefreshToken2)).toBe(true);
  });

  it('should return false if the id is incorrect', () => {
    const userTokenRefreshToken1 = UserTokenRefreshToken.generate({ userId, email });
    const userTokenRefreshToken2 = UserTokenRefreshToken.generate({ userId, email: UserEmail.fromString('hoge@test.com') });
    expect(userTokenRefreshToken1.isEqual(userTokenRefreshToken2)).toBe(false);
  });
});

describe('decode', () => {
  const secret = 'test-secret';
  const expiresIn = '1h';
  const userId = UserId.generate();
  const email = UserEmail.fromString('test@test.com');

  beforeEach(() => {
    process.env.JWT_REFRESH_TOKEN_SECRET = secret;
    process.env.JWT_REFRESH_TOKEN_EXPIRES_IN = expiresIn;
  });

  it('should return the payload if the token is correct', () => {
    const userTokenRefreshToken = UserTokenRefreshToken.generate({ userId, email });
    const decoded = userTokenRefreshToken.decode();
    expect({
      userId: decoded?.userId.toString(),
      email: decoded?.email.toString(),
    }).toEqual({ userId: userId.toString(), email: email.toString() });
  });
});

describe('canVerify', () => {
  const secret = 'test-secret';
  const expiresIn = '1h';
  const userId = UserId.generate();
  const email = UserEmail.fromString('test@test.com');

  beforeEach(() => {
    process.env.JWT_REFRESH_TOKEN_SECRET = secret;
    process.env.JWT_REFRESH_TOKEN_EXPIRES_IN = expiresIn;
  });

  it('should verify the token within its expiration time', () => {
    const userTokenRefreshToken = UserTokenRefreshToken.generate({ userId, email });
    expect(userTokenRefreshToken.canVerify()).toBe(true);
  });

  it('should not verify the token after its expiration time', () => {
    const userTokenRefreshToken = UserTokenRefreshToken.generate({ userId, email });
    expect(userTokenRefreshToken.canVerify(
      { clockTimestamp: Math.floor((new Date().getTime() + ms('2h')) / 1000) },
    )).toBe(false);
  });
});
