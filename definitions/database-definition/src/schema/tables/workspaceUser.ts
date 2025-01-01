import { sqliteTable, integer, text, primaryKey, unique } from 'drizzle-orm/sqlite-core';

import type { InferSelectModel } from 'drizzle-orm';

export const workspaceUser = sqliteTable('workspace_user', {
  id: text('id').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }),
  userId: text('user_id').notNull(),
}, t => [
  primaryKey({ columns: [t.id] }),
  unique().on(t.userId),
]);

export type WorkspaceUserSelectColumns = InferSelectModel<typeof workspaceUser>;
