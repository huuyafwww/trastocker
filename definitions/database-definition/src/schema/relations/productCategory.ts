import { relations } from 'drizzle-orm';

import type { CreateRelation } from '../';

export const createProductCategoryRelations: CreateRelation = (schema) => {
  return relations(schema.productCategory, ({ one }) => ({
    product: one(schema.product),
  }));
};
