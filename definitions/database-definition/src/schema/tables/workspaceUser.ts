import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

import type { InferSelectModel } from 'drizzle-orm';

export const workspaceUser = sqliteTable('workspace_user', {
  id: text('id').notNull().primaryKey(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }),
  workspaceId: text('workspace_id').notNull(),
  userId: text('user_id').notNull(),
});

export type WorkspaceUserSelectColumns = InferSelectModel<typeof workspaceUser>;
