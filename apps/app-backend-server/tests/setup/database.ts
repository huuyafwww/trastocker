import { getDatabaseClient } from '../clients/database';
import { migrateFromDatabase } from '../helpers/migrate-database';

import type { Database } from '@trastocker/drizzle-helper/better-sqlite3';

export const setupDatabase = (): Database => {
  const database = getDatabaseClient();
  migrateFromDatabase(database);
  return database;
};
