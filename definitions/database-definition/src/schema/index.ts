import { user } from './tables/user';
import { userToken } from './tables/userToken';
import { workspace } from './tables/workspace';
import { workspaceUser } from './tables/workspaceUser';

import type { UserSelectColumns } from './tables/user';
import type { UserTokenSelectColumns } from './tables/userToken';
import type { WorkspaceSelectColumns } from './tables/workspace';
import type { WorkspaceUserSelectColumns } from './tables/workspaceUser';
import type { Relations } from 'drizzle-orm';
import type { AnySQLiteTable } from 'drizzle-orm/sqlite-core';

export { user, userToken };

export const schema = {
  user,
  userToken,
  workspace,
  workspaceUser,
} satisfies Record<string, AnySQLiteTable<NonNullable<unknown>> | Relations>;

export type {
  UserSelectColumns,
  UserTokenSelectColumns,
  WorkspaceSelectColumns,
  WorkspaceUserSelectColumns,
};
