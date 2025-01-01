import { sqliteTable, integer, text, primaryKey } from 'drizzle-orm/sqlite-core';

import type { InferSelectModel } from 'drizzle-orm';

export const workspace = sqliteTable('workspace', {
  id: text('id').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  deletedAt: integer('deleted_at', { mode: 'timestamp' }),
  name: text('name').notNull(),
  invite_code: text('invite_code').notNull(),
}, t => [
  primaryKey({ columns: [t.id] }),
]);

export type WorkspaceSelectColumns = InferSelectModel<typeof workspace>;
