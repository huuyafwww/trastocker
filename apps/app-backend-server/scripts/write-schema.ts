import { writeFileSync } from 'node:fs';

import { lexicographicSortSchema, printSchema } from 'graphql';

import { schema } from '@graphql/schema';

const sortedSchema = lexicographicSortSchema(schema);

writeFileSync('./schema.graphql', printSchema(sortedSchema));
