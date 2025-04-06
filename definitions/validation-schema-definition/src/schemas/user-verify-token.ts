import * as v from 'valibot';

const USER_VERIFY_TOKEN_MAX_LENGTH = 50;

export const UserVerifyTokenSchema = v.pipe(
  v.string(),
  v.check(value => value.length <= USER_VERIFY_TOKEN_MAX_LENGTH, `User verify token must be at most ${USER_VERIFY_TOKEN_MAX_LENGTH} characters long`),
);
