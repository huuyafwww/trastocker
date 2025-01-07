import fs from 'fs';

import { schema } from '@trastocker/database-definition';
import { drizzle } from 'drizzle-orm/sql-js';
import { migrate } from 'drizzle-orm/sql-js/migrator';
import initSqlJs from 'sql.js';

import { seed } from '../seeders';

const sqliteFilePath = '.storybook/public/mock-database.sqlite';

// Create an empty database
fs.writeFileSync(sqliteFilePath, '');

const SQL = await initSqlJs();
const sqlJsDatabase = new SQL.Database(fs.readFileSync(sqliteFilePath));
const database = drizzle(sqlJsDatabase, { schema });
migrate(database, { migrationsFolder: '../../definitions/database-definition/migrations' });
await seed(database);

fs.writeFileSync(
  sqliteFilePath,
  Buffer.from(sqlJsDatabase.export()),
);
