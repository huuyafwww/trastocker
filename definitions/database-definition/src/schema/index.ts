import { createProductCategoryRelations } from './relations/productCategory';
import { createWorkspaceProductRelations } from './relations/workspaceProduct';
import { createWorkspaceProductCategoryRelations } from './relations/workspaceProductCategory';
import { createWorkspaceUserRelations } from './relations/workspaceUser';
import { product } from './tables/product';
import { productCategory } from './tables/productCategory';
import { user } from './tables/user';
import { userToken } from './tables/userToken';
import { workspace } from './tables/workspace';
import { workspaceProduct } from './tables/workspaceProduct';
import { workspaceProductCategory } from './tables/workspaceProductCategory';
import { workspaceUser } from './tables/workspaceUser';

import type { ProductSelectColumns } from './tables/product';
import type { ProductCategorySelectColumns } from './tables/productCategory';
import type { UserSelectColumns } from './tables/user';
import type { UserTokenSelectColumns } from './tables/userToken';
import type { WorkspaceSelectColumns } from './tables/workspace';
import type { WorkspaceProductSelectColumns } from './tables/workspaceProduct';
import type { WorkspaceProductCategorySelectColumns } from './tables/workspaceProductCategory';
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
  workspaceProduct,
  workspaceProductCategory,
} satisfies Record<string, AnySQLiteTable<NonNullable<unknown>> | Relations>;

[
  createWorkspaceUserRelations,
  createProductCategoryRelations,
  createWorkspaceProductRelations,
  createWorkspaceProductCategoryRelations,
].map(createRelation => createRelation(schema));

export type {
  UserSelectColumns,
  UserTokenSelectColumns,
  WorkspaceSelectColumns,
  WorkspaceUserSelectColumns,
  ProductSelectColumns,
  ProductCategorySelectColumns,
  WorkspaceProductSelectColumns,
  WorkspaceProductCategorySelectColumns,
};
export type CreateRelation = (tables: typeof schema) => ReturnType<typeof relations>;
