import { sqliteTable, text, integer, primaryKey, unique } from 'drizzle-orm/sqlite-core';

import type { InferSelectModel } from 'drizzle-orm';

export const user = sqliteTable('user', {
  id: text('id').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  registeredAt: integer('registered_at', { mode: 'timestamp' }).notNull(),
  verifiedAt: integer('verified_at', { mode: 'timestamp' }),
}, t => [
  primaryKey({ columns: [t.id] }),
  unique().on(t.email),
]);

export type UserSelectColumns = InferSelectModel<typeof user>;
