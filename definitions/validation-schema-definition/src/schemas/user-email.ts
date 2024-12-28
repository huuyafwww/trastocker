import * as v from 'valibot';

export const UserEmailSchema = v.pipe(
  v.string(),
  v.email(),
);
