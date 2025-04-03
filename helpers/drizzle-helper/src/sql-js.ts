import { schema } from '@trastocker/database-definition';
import { drizzle } from 'drizzle-orm/sql-js';
import initSqlJs from 'sql.js';

import type { SQLJsDatabase } from 'drizzle-orm/sql-js';

export type Database = SQLJsDatabase<typeof schema>;

export const connectDatabase = async (options: {
  url: string;
}): Promise<Database> => {
  const database = await (async () => {
    // TODO: support dynamic version
    const SQLPromise = initSqlJs({
      locateFile: () => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/sql-wasm.wasm`,
    });
    const dataPromise = fetch(options.url).then(res => res.arrayBuffer());
    const [SQL, buffer] = await Promise.all([SQLPromise, dataPromise]);
    return new SQL.Database(new Uint8Array(buffer));
  })();
  return drizzle(database, { schema });
};
