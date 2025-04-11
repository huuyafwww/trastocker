import * as v from 'valibot';

const USER_VERIFY_TOKEN_MINLENGTH = 32;

export const UserVerifyTokenSchema = v.pipe(
  v.string(),
  v.check(value => value.length >= USER_VERIFY_TOKEN_MINLENGTH, `User verify token must be at least ${USER_VERIFY_TOKEN_MINLENGTH} characters long`),
);
