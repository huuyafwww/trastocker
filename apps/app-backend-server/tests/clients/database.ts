import { connectDatabase, getInMemoryDatabase } from '@trastocker/database-definition';

import type { Database } from '@trastocker/database-definition';

export const getDatabaseClient = async (): Promise<Database> => {
  return connectDatabase(await getInMemoryDatabase());
};
