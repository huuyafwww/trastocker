import * as v from 'valibot';

const PASSWORD_MIN_LENGTH = 12;

export const UserPasswordSchema = v.pipe(
  v.string(),
  v.check(value => value.length >= PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`),
  v.check(value => /[a-z]/.test(value), 'Password must contain at least one lowercase letter'),
  v.check(value => /[A-Z]/.test(value), 'Password must contain at least one uppercase letter'),
  v.check(value => /[0-9]/.test(value), 'Password must contain at least one number'),
  v.check(value => /[!-/:-@[-`{-~]/.test(value), 'Password must contain at least one special character'),
);
