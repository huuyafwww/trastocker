import { sqliteTable, integer, text, primaryKey } from 'drizzle-orm/sqlite-core';

import type { InferSelectModel } from 'drizzle-orm';

export const userToken = sqliteTable('user_token', {
  id: text('id').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }),
  userId: text('user_id').notNull(),
  accessToken: text('access_token', { length: 255 }).notNull(),
  refreshToken: text('refresh_token', { length: 255 }).notNull(),
}, t => [
  primaryKey({ columns: [t.id] }),
]);

export type UserTokenSelectColumns = InferSelectModel<typeof userToken>;
