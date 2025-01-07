import { factory, drop } from '@mswjs/data';
import { drizzle } from 'drizzle-orm/sql-js';
import initSqlJs from 'sql.js';

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
  drop(database);
  seeders.forEach((seeder) => {
    seeder(database, context);
  });
  return database;
};

export const drizzleDatabase = async () => {
  // const sqliteFilePath = 'mock-database.sqlite';
  // const sqliteFile = await fetch(sqliteFilePath).then(response => response.arrayBuffer());

  const SQL = await initSqlJs({
    locateFile: () => `mock-database.sqlite`,
  });
  return drizzle(new SQL.Database());

  // await initSqlJs(
  //   { locateFile: () => 'sql-wasm.wasm' },
  // ).then(function (SQL) {
  //   const database = new SQL.Database(new Uint8Array(sqliteFile));
  //   return drizzle(database);
  // });
  // )

  // return initSqlJs().then(function (SQL) {
  //   const database = new SQL.Database(new Uint8Array(sqliteFile));
  //   return drizzle(database);
  // });
};
