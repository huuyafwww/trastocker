import { user } from './tables/user';
import { userToken } from './tables/userToken';

import type { UserSelectColumns } from './tables/user';
import type { UserTokenSelectColumns } from './tables/userToken';
import type { Relations } from 'drizzle-orm';
import type { AnySQLiteTable } from 'drizzle-orm/sqlite-core';

export { user, userToken };

export const schema = {
  user,
  userToken,
} satisfies Record<string, AnySQLiteTable<NonNullable<unknown>> | Relations>;

export type { UserSelectColumns, UserTokenSelectColumns };
