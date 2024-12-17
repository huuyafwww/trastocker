import { drizzle } from 'drizzle-orm/d1';

import { schema } from './schema';

import type { AnyD1Database, DrizzleD1Database } from 'drizzle-orm/d1';

export type Database = DrizzleD1Database<typeof schema>;

export const connectDatabase = (database: AnyD1Database): Database => {
  return drizzle(database, { schema });
};

export * from './schema';
