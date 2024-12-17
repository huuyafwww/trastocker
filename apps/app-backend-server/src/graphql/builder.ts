import SchemaBuilder from '@pothos/core';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';
import ValibotPlugin from 'pothos-plugin-valibot';

import type { Context } from '@index';
import type { YogaInitialContext } from 'graphql-yoga';

type Scalars = {
  ID: {
    Input: string;
    Output: string;
  };
  DateTime: {
    Input: Date;
    Output: Date;
  };
};

export const builder = new SchemaBuilder<{
  DefaultFieldNullability: false;
  DefaultInputFieldRequiredness: true;
  Scalars: Scalars;
  Context: YogaInitialContext & Context;
  AuthScopes: {
    private: boolean;
  };
}>({
  defaultFieldNullability: false,
  defaultInputFieldRequiredness: true,
  plugins: [
    SimpleObjectsPlugin,
    ScopeAuthPlugin,
    ValibotPlugin,
  ],
  scopeAuth: {
    cacheKey: value => JSON.stringify(value),
    defaultStrategy: 'any',
    authScopes: context => ({
      private: !!context.authUser,
    }),
  },
});

builder.queryType({});
builder.mutationType({});
