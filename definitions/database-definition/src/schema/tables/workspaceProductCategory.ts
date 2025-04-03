import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

import { productCategory } from './productCategory';
import { workspace } from './workspace';

import type { InferSelectModel } from 'drizzle-orm';

export const workspaceProductCategory = sqliteTable('workspace_product_category', {
  id: text('id').notNull().primaryKey(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }),
  workspaceId: text('workspace_id').notNull().references(() => workspace.id),
  productCategoryId: text('product_category_id').notNull().references(() => productCategory.id),
});

export type WorkspaceProductCategorySelectColumns = InferSelectModel<typeof workspaceProductCategory>;
