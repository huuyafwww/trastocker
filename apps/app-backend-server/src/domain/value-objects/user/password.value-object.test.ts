import { UserPassword, InvalidUserPasswordError } from '@domain/value-objects/user/password.value-object';

describe('isEqual', () => {
  it('should return true if the password is correct', () => {
    const userPassword = UserPassword.fromRawString('Password123456!', { rounds: 1 });
    expect(userPassword.isEqual('Password123456!')).toBe(true);
  });

  it('should return false if the password is incorrect', () => {
    const userPassword = UserPassword.fromRawString('Password123456!', { rounds: 1 });
    expect(userPassword.isEqual('Password123456')).toBe(false);
  });

  it('should return true if the password is correct', () => {
    const userPassword = UserPassword.fromRawString('Password123456!', { rounds: 1 });
    expect(UserPassword.fromString(userPassword.toString()).isEqual('Password123456!')).toBe(true);
  });

  it('should return false if the password is incorrect', () => {
    const userPassword = UserPassword.fromRawString('Password123456!', { rounds: 1 });
    expect(UserPassword.fromString(userPassword.toString()).isEqual('Password123456')).toBe(false);
  });
});

describe('isValid', () => {
  it('should return true if the password is valid', () => {
    expect(UserPassword.isValid('Password123456!')).toBe(true);
  });

  it('should return false if the password does not contain an uppercase letter', () => {
    expect(UserPassword.isValid('password123456!')).toBe(false);
  });

  it('should return false if the password does not contain a lowercase letter', () => {
    expect(UserPassword.isValid('PASSWORD123456!')).toBe(false);
  });

  it('should return false if the password does not contain a number', () => {
    expect(UserPassword.isValid('PasswordPassword!')).toBe(false);
  });

  it('should return false if the password is less than 12 characters', () => {
    expect(UserPassword.isValid('Pass123!')).toBe(false);
  });

  it('should return throw if the password is invalid', () => {
    expect(() => UserPassword.fromRawString('Pass123!')).toThrow('Invalid UserPassword');
    expect(() => UserPassword.fromRawString('Pass123!')).toThrowError(InvalidUserPasswordError);
  });
});
