import { schema } from '@trastocker/database-definition';
import BetterSqlite3Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

export type Database = BetterSQLite3Database<typeof schema>;

export const connectDatabase = (options: {
  url?: string;
} = {}): Database => {
  const database = (() => {
    if (options.url) return options.url;
    return new BetterSqlite3Database(':memory:');
  })();
  return drizzle(database, { schema });
};
