import { InvalidUserNameError, UserName } from '@domain/value-objects/user/name.value-object';

describe('isEqual', () => {
  it('should return true if the id is correct', () => {
    const userName = 'test';
    const userName1 = UserName.fromString(userName);
    const userName2 = UserName.fromString(userName);
    expect(userName1.isEqual(userName2)).toBe(true);
  });

  it('should return false if the id is incorrect', () => {
    const userName1 = UserName.fromString('test1');
    const userName2 = UserName.fromString('test2');
    expect(userName1.isEqual(userName2)).toBe(false);
  });
});

describe('isValid', () => {
  it('should return true if the id is valid', () => {
    expect(UserName.isValid('test')).toBe(true);
  });

  it('should return false if the id is invalid', () => {
    expect(UserName.isValid('')).toBe(false);
  });

  it('should return throw if the id is invalid', () => {
    expect(() => UserName.fromString('')).toThrow('Invalid UserName');
    expect(() => UserName.fromString('')).toThrowError(InvalidUserNameError);
  });
});
