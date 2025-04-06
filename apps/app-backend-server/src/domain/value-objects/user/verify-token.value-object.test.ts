import ms from 'ms';

import { UserEmail } from '@domain/value-objects/user/email.value-object';
import { UserId } from '@domain/value-objects/user/id.value-object';
import { UserVerifyToken } from '@domain/value-objects/user/verify-token.value-object';

describe('isEqual', () => {
  const userId = UserId.generate();
  const email = UserEmail.fromString('test@test.com');

  it('should return true if the id is correct', () => {
    const userVerifyToken1 = UserVerifyToken.generate({ userId, email });
    const userVerifyToken2 = UserVerifyToken.generate({ userId, email });
    expect(userVerifyToken1.isEqual(userVerifyToken2)).toBe(true);
  });

  it('should return false if the id is incorrect', () => {
    const userVerifyToken1 = UserVerifyToken.generate({ userId, email });
    const userVerifyToken2 = UserVerifyToken.generate({ userId, email: UserEmail.fromString('hoge@test.com') });
    expect(userVerifyToken1.isEqual(userVerifyToken2)).toBe(false);
  });
});

describe('decode', () => {
  const userId = UserId.generate();
  const email = UserEmail.fromString('test@test.com');

  it('should return the payload if the token is correct', () => {
    const userVerifyToken = UserVerifyToken.generate({ userId, email });
    const decoded = userVerifyToken.decode();
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
    const userVerifyToken = UserVerifyToken.generate({ userId, email });
    expect(userVerifyToken.canVerify()).toBe(true);
  });

  it('should not verify the token after its expiration time', () => {
    const userVerifyToken = UserVerifyToken.generate({ userId, email });
    expect(userVerifyToken.canVerify(
      { clockTimestamp: Math.floor((new Date().getTime() + ms('2h')) / 1000) },
    )).toBe(false);
  });
});
