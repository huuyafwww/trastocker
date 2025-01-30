import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

import { product } from './product';
import { workspace } from './workspace';

import type { InferSelectModel } from 'drizzle-orm';

export const workspaceProduct = sqliteTable('workspace_product', {
  id: text('id').notNull().primaryKey(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }),
  workspaceId: text('workspace_id').notNull().references(() => workspace.id),
  productId: text('product_id').notNull().references(() => product.id),
});

export type WorkspaceProductSelectColumns = InferSelectModel<typeof workspaceProduct>;
