import fs from 'fs';

import { drizzle } from 'drizzle-orm/sql-js';
import { migrate } from 'drizzle-orm/sql-js/migrator';
import { hasCommand } from 'has-command';
import initSqlJs from 'sql.js';
import { $ } from 'zx';

import { schema } from '../src';

if (!await hasCommand('tbls')) {
  console.error('tbls is not installed. Please install the tbls.');
  process.exit(1);
}

const sqliteFilePath = 'schema.sqlite';
fs.writeFileSync(sqliteFilePath, '');

const SQL = await initSqlJs();
const sqlJsDatabase = new SQL.Database(fs.readFileSync(sqliteFilePath));
const database = drizzle(sqlJsDatabase, { schema });
migrate(database, { migrationsFolder: './migrations' });

fs.writeFileSync(
  sqliteFilePath,
  Buffer.from(sqlJsDatabase.export()),
);

await $`tbls out -t json -o schema.json`;
await $`tbls doc --force`;
