import { migrate, seed } from './data';
import { createHandlers } from './handlers';

import type { Database } from './data';
import type { GraphQLHandler } from 'msw';

export const setupDatabase = (): Database => {
  const database = migrate();
  const context = {
    ISODateString: new Date().toISOString(),
  };
  return seed(database, context);
};

export const setupHandlers = (database: Database): GraphQLHandler[] => {
  return createHandlers.map(createHandler => createHandler({ database }));
};
