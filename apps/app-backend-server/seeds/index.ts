import { schema } from '@trastocker/database-definition';
import { connectDatabase } from '@trastocker/drizzle-helper/better-sqlite3';

import { users } from './user';
import { workspaces } from './workspace';
import { workspaceUsers } from './workspace-user';

import type { Database } from '@trastocker/drizzle-helper/better-sqlite3';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not defined');

const database = connectDatabase({ url: process.env.DATABASE_URL });
export type Seeder = (database: Database) => void;

const seeders: Seeder[] = [
  users,
  workspaces,
  workspaceUsers,
];

// The order of deletion takes foreign keys into account.
database.delete(schema.workspaceUser).run();
database.delete(schema.user).run();
database.delete(schema.workspace).run();

seeders.forEach(seeder => seeder(database));
