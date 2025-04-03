import * as v from 'valibot';

const USER_NAME_MIN_LENGTH = 1;
const USER_NAME_MAX_LENGTH = 50;

export const UserNameSchema = v.pipe(
  v.string(),
  v.check(value => value.length >= USER_NAME_MIN_LENGTH, `Workspace name must be at least ${USER_NAME_MIN_LENGTH} characters long`),
  v.check(value => value.length <= USER_NAME_MAX_LENGTH, `Workspace name must be at most ${USER_NAME_MAX_LENGTH} characters long`),
);
