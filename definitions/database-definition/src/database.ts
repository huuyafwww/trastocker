import { D1Database, D1DatabaseAPI } from '@miniflare/d1';
import { createSQLiteDB } from '@miniflare/shared';

import type { AnyD1Database } from 'drizzle-orm/d1';

export const getDatabaseFromPath = async (path: string): Promise<AnyD1Database> => {
  const sqliteDb = await createSQLiteDB(path);
  return new D1Database(new D1DatabaseAPI(sqliteDb));
};

export const getInMemoryDatabase = async (): Promise<AnyD1Database> => {
  const sqliteDb = await createSQLiteDB(':memory:');
  return new D1Database(new D1DatabaseAPI(sqliteDb));
};
