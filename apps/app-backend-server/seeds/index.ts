import { D1Database, D1DatabaseAPI } from '@miniflare/d1';
import { createSQLiteDB } from '@miniflare/shared';
import { connectDatabase } from '@trastocker/database-definition';
import { schema } from '@trastocker/database-definition';

import { users } from './user';
import { workspaces } from './workspace';
import { workspaceUsers } from './workspace-user';

import type { Database } from '@trastocker/database-definition';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not defined');

const sqliteDb = await createSQLiteDB(process.env.DATABASE_URL);
const d1DataBase = new D1Database(new D1DatabaseAPI(sqliteDb));
const database = connectDatabase(d1DataBase);

export type Seeder = (database: Database) => Promise<void>;

const seeders: Seeder[] = [
  users,
  workspaces,
  workspaceUsers,
];

// The order of deletion takes foreign keys into account.
await database.delete(schema.workspaceUser);
await database.delete(schema.user);
await database.delete(schema.workspace);

for (const seeder of seeders) {
  await seeder(database);
}
