import { schema } from '@trastocker/database-definition';
import { drizzle } from 'drizzle-orm/sql-js';
import initSqlJs from 'sql.js';

import { createHandlers } from './handlers';

import type { SQLJsDatabase } from 'drizzle-orm/sql-js';
import type { GraphQLHandler } from 'msw';

export type Database = SQLJsDatabase<typeof schema>;

const connectDatabase = async (): Promise<Database> => {
  // TODO: support dynamic version
  const SQLPromise = initSqlJs({
    locateFile: () => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/sql-wasm.wasm`,
  });

  const dataPromise = fetch('mock-database.sqlite').then(res => res.arrayBuffer());
  const [SQL, buffer] = await Promise.all([SQLPromise, dataPromise]);
  return drizzle(new SQL.Database(new Uint8Array(buffer)), { schema });
};

const setupHandlers = (promiseDatabase: Promise<Database>): GraphQLHandler[] => {
  return createHandlers.map(createHandler => createHandler({ promiseDatabase }));
};

export { connectDatabase, setupHandlers };
