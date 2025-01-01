import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

import type { InferSelectModel } from 'drizzle-orm';

export const user = sqliteTable('user', {
  id: text('id').notNull().primaryKey(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  registeredAt: integer('registered_at', { mode: 'timestamp' }).notNull(),
  verifiedAt: integer('verified_at', { mode: 'timestamp' }),
});

export type UserSelectColumns = InferSelectModel<typeof user>;
