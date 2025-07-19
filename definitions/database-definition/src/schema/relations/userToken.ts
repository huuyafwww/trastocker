import { relations } from 'drizzle-orm';

import type { CreateRelation } from '../';

export const createUserTokenRelations: CreateRelation = (schema) => {
  return relations(schema.userToken, ({ one }) => ({
    user: one(schema.user),
    userToken: one(schema.userToken),
  }));
};
