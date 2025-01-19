import { InvalidUserEmailError, UserEmail } from '@domain/value-objects/user/email.value-object';

describe('isEqual', () => {
  it('should return true if the email is correct', () => {
    const userEmail1 = UserEmail.fromString('test@test.com');
    const userEmail2 = UserEmail.fromString('test@test.com');
    expect(userEmail1.isEqual(userEmail2)).toBe(true);
  });

  it('should return false if the email is incorrect', () => {
    const userEmail1 = UserEmail.fromString('test@test.com');
    const userEmail2 = UserEmail.fromString('test@test.jp');
    expect(userEmail1.isEqual(userEmail2)).toBe(false);
  });
});

describe('isValid', () => {
  it('should return true if the email is valid', () => {
    expect(UserEmail.isValid('test@test.com')).toBe(true);
  });

  it('should return false if the email is invalid', () => {
    expect(UserEmail.isValid('test@test')).toBe(false);
  });

  it('should return throw if the email is invalid', () => {
    expect(() => UserEmail.fromString('test@test')).toThrow('Invalid UserEmail');
    expect(() => UserEmail.fromString('test@test')).toThrowError(InvalidUserEmailError);
  });
});
