import { factory } from '@mswjs/data';

import { schemas } from './schemas';
import { seeders } from './seeders';

import type { Schemas } from './schemas';

export const migrate = () => {
  return factory<Schemas>(schemas);
};
export type Database = ReturnType<typeof migrate>;

export type SeederContext = {
  ISODateString: string;
};
export const seed = (database: Database, context: SeederContext): Database => {
  seeders.forEach((seeder) => {
    seeder(database, context);
  });
  return database;
};
