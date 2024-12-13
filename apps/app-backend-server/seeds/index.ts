import { connectDatabase, getDatabaseFromPath } from '@trastocker/database-definition';

import { users } from './user';

import type { Database } from '@trastocker/database-definition';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not defined');

const database = connectDatabase(await getDatabaseFromPath(process.env.DATABASE_URL));

export type Seeder = (database: Database) => Promise<void>;

const seeders: Seeder[] = [
  users,
];

for (const seeder of seeders) {
  await seeder(database);
}
