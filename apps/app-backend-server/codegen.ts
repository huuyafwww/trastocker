import { readFileSync } from 'fs';

import type { CodegenConfig } from '@graphql-codegen/cli';

// @see https://the-guild.dev/graphql/codegen/docs/config-reference/codegen-config
const config: CodegenConfig = {
  overwrite: true,
  schema: readFileSync('./schema.graphql', 'utf8').toString(),
  generates: {
    '.graphql/': {
      preset: 'client',
      plugins: [],
      config: {
        arrayInputCoercion: false,
        scalars: {
          ID: 'string',
          DateTime: 'string',
        },
      },
    },
  },
};

export default config;
