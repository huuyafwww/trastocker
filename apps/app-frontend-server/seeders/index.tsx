import { users } from './user';

import type { schema } from '@trastocker/database-definition';
import type { SQLJsDatabase } from 'drizzle-orm/sql-js';

export type Database = SQLJsDatabase<typeof schema>;

export type Context = {
  now: Date;
};
export type Seeder = (database: Database, context: Context) => Promise<void>;

const seeders: Seeder[] = [
  users,
];

export const seed = async (database: Database) => {
  const context = {
    now: new Date(),
  };
  for (const seeder of seeders) {
    await seeder(database, context);
  }
};
