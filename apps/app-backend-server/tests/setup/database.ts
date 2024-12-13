import { getDatabaseClient } from '../clients/database';
import { migrateFromDatabase } from '../helpers/migrate-database';

import type { Database } from '@trastocker/database-definition';

export const setupDatabase = async (): Promise<Database> => {
  const database = await getDatabaseClient();
  await migrateFromDatabase(database);
  return database;
};
