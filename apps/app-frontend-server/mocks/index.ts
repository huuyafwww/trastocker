import { createHandlers } from './handlers';

import type { Database } from '@trastocker/drizzle-helper/sql-js';
import type { GraphQLHandler } from 'msw';

const setupHandlers = (promiseDatabase: Promise<Database>): GraphQLHandler[] => {
  return createHandlers.map(createHandler => createHandler({ promiseDatabase }));
};

export { setupHandlers };
