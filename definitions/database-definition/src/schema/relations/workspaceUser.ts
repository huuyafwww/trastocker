import { relations } from 'drizzle-orm';

import type { CreateRelation } from '../';

export const createWorkspaceUserRelations: CreateRelation = (schema) => {
  return relations(schema.workspaceUser, ({ many }) => ({
    user: many(schema.user),
    workspace: many(schema.workspace),
  }));
};
