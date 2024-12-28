import { D1Database, D1DatabaseAPI } from '@miniflare/d1';
import { createSQLiteDB } from '@miniflare/shared';
import { connectDatabase } from '@trastocker/database-definition';

import type { Database } from '@trastocker/database-definition';

export const getDatabaseClient = async (): Promise<Database> => {
  const sqliteDb = await createSQLiteDB(':memory:');
  const d1DataBase = new D1Database(new D1DatabaseAPI(sqliteDb));
  return connectDatabase(d1DataBase);
};
