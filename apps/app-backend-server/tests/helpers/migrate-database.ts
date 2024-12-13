import { migrate } from 'drizzle-orm/d1/migrator';

import type { Database } from '@trastocker/database-definition';

export const migrateFromDatabase = async (database: Database): Promise<void> => {
  await migrate(database, { migrationsFolder: '../../definitions/database-definition/migrations' });
};
