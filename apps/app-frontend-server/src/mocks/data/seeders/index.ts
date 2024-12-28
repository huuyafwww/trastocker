import { seedUser } from './user';

import type { Database, SeederContext } from '..';

export type Seeder = (database: Database, context: SeederContext) => void;
export type Seeders = Seeder[];

export const seeders: Seeders = [
  seedUser,
];
