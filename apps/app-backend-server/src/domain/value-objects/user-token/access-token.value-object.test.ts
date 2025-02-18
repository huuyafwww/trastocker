import ms from 'ms';

import { UserEmail } from '@domain/value-objects/user/email.value-object';
import { UserId } from '@domain/value-objects/user/id.value-object';
import { UserTokenAccessToken } from '@domain/value-objects/user-token/access-token.value-object';

describe('isEqual', () => {
  const userId = UserId.generate();
  const email = UserEmail.fromString('test@test.com');

  it('should return true if the id is correct', () => {
    const userTokenAccessToken1 = UserTokenAccessToken.generate({ userId, email });
    const userTokenAccessToken2 = UserTokenAccessToken.generate({ userId, email });
    expect(userTokenAccessToken1.isEqual(userTokenAccessToken2)).toBe(true);
  });

  it('should return false if the id is incorrect', () => {
    const userTokenAccessToken1 = UserTokenAccessToken.generate({ userId, email });
    const userTokenAccessToken2 = UserTokenAccessToken.generate({ userId, email: UserEmail.fromString('hoge@test.com') });
    expect(userTokenAccessToken1.isEqual(userTokenAccessToken2)).toBe(false);
  });
});

describe('decode', () => {
  const userId = UserId.generate();
  const email = UserEmail.fromString('test@test.com');

  it('should return the payload if the token is correct', () => {
    const userTokenAccessToken = UserTokenAccessToken.generate({ userId, email });
    const decoded = userTokenAccessToken.decode();
    expect({
      userId: decoded?.userId.toString(),
      email: decoded?.email.toString(),
    }).toEqual({ userId: userId.toString(), email: email.toString() });
  });
});

describe('canVerify', () => {
  const userId = UserId.generate();
  const email = UserEmail.fromString('test@test.com');

  it('should verify the token within its expiration time', () => {
    const userTokenAccessToken = UserTokenAccessToken.generate({ userId, email });
    expect(userTokenAccessToken.canVerify()).toBe(true);
  });

  it('should not verify the token after its expiration time', () => {
    const userTokenAccessToken = UserTokenAccessToken.generate({ userId, email });
    expect(userTokenAccessToken.canVerify(
      { clockTimestamp: Math.floor((new Date().getTime() + ms('2h')) / 1000) },
    )).toBe(false);
  });
});
