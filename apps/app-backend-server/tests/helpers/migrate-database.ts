import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

import type { Database } from '@trastocker/drizzle-helper/better-sqlite3';

export const migrateFromDatabase = (database: Database): void => {
  migrate(database, { migrationsFolder: '../../definitions/database-definition/migrations' });
};
