import { relations } from 'drizzle-orm';

import type { CreateRelation } from '../';

export const createWorkspaceProductCategoryRelations: CreateRelation = (schema) => {
  return relations(schema.workspaceProductCategory, ({ one }) => ({
    workspace: one(schema.workspace),
    productCategory: one(schema.productCategory),
  }));
};
