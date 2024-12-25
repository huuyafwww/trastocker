import { graphql, HttpResponse } from 'msw';

import { user } from './user';

import type { HandlerContext, GraphQLResolverExtras, CreateHandler } from '..';
import type { IQuery } from '@trastocker/graphql-definition';

const handlers = {
  user,
};

export const createQueryHandlers: CreateHandler[] = [
  ...(Object.keys({
    ...handlers,
  }) as Array<keyof (typeof handlers)>).map(queryName => (context: HandlerContext) => {
    const handler = handlers[queryName];
    return graphql.query<
      {
        [key in typeof queryName]: ReturnType<typeof handlers[typeof queryName]>
      },
      Parameters<typeof handlers[typeof queryName]>[0]['variables']
    > (queryName, (args) => {
      return HttpResponse.json({
        data: {
          [queryName]: handler(args, context),
        },
      });
    });
  }),
];

export type QueryHandler<
  T extends keyof Omit<IQuery, '__typename'>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  V extends Record<string, any>,
> = (info: GraphQLResolverExtras<V>, context: HandlerContext) => IQuery[T];
