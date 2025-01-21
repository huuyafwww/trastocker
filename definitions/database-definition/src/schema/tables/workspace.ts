import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

import type { InferSelectModel } from 'drizzle-orm';

export const workspace = sqliteTable('workspace', {
  id: text('id').notNull().primaryKey(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }),
  name: text('name').notNull(),
  inviteCode: text('invite_code').notNull(),
});

export type WorkspaceSelectColumns = InferSelectModel<typeof workspace>;
