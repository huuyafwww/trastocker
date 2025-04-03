import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

import { product } from './product';

import type { InferSelectModel } from 'drizzle-orm';

export const productCategory = sqliteTable('product_category', {
  id: text('id').notNull().primaryKey(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }),
  name: text('name').notNull(),
  productId: text('product_id').notNull().references(() => product.id),
});

export type ProductCategorySelectColumns = InferSelectModel<typeof productCategory>;
