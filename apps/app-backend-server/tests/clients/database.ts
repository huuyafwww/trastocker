import { connectDatabase } from '@trastocker/drizzle-helper/better-sqlite3';

import type { Database } from '@trastocker/drizzle-helper/better-sqlite3';

export const getDatabaseClient = (): Database => {
  return connectDatabase();
};
