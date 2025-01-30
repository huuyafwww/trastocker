import { relations } from 'drizzle-orm';

import type { CreateRelation } from '../';

export const createWorkspaceProductRelations: CreateRelation = (schema) => {
  return relations(schema.workspaceProduct, ({ one }) => ({
    workspace: one(schema.workspace),
    product: one(schema.product),
  }));
};
