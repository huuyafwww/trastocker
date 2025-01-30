import { createProductCategoryRelations } from './relations/productCategory';
import { createWorkspaceUserRelations } from './relations/workspaceUser';
import { product } from './tables/product';
import { productCategory } from './tables/productCategory';
import { user } from './tables/user';
import { userToken } from './tables/userToken';
import { workspace } from './tables/workspace';
import { workspaceUser } from './tables/workspaceUser';

import type { ProductSelectColumns } from './tables/product';
import type { ProductCategorySelectColumns } from './tables/productCategory';
import type { UserSelectColumns } from './tables/user';
import type { UserTokenSelectColumns } from './tables/userToken';
import type { WorkspaceSelectColumns } from './tables/workspace';
import type { WorkspaceUserSelectColumns } from './tables/workspaceUser';
import type { relations } from 'drizzle-orm';
import type { Relations } from 'drizzle-orm';
import type { AnySQLiteTable } from 'drizzle-orm/sqlite-core';

export { user, userToken };

export const schema = {
  user,
  userToken,
  workspace,
  workspaceUser,
  product,
  productCategory,
} satisfies Record<string, AnySQLiteTable<NonNullable<unknown>> | Relations>;

[
  createWorkspaceUserRelations,
  createProductCategoryRelations,
].map(createRelation => createRelation(schema));

export type {
  UserSelectColumns,
  UserTokenSelectColumns,
  WorkspaceSelectColumns,
  WorkspaceUserSelectColumns,
  ProductSelectColumns,
  ProductCategorySelectColumns,
};
export type CreateRelation = (tables: typeof schema) => ReturnType<typeof relations>;
