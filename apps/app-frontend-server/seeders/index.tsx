import { users } from './user';
import { workspaces } from './workspace';
import { workspaceUsers } from './workspace-user';

import type { schema } from '@trastocker/database-definition';
import type { SQLJsDatabase } from 'drizzle-orm/sql-js';

export type Database = SQLJsDatabase<typeof schema>;

export type Context = {
  now: Date;
};
export type Seeder = (database: Database, context: Context) => Promise<void>;

const seeders: Seeder[] = [
  users,
  workspaces,
  workspaceUsers,
];

export const seed = async (database: Database) => {
  for (const seeder of seeders) {
    await seeder(database, {
      now: new Date(),
    });
  }
};
