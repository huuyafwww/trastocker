import { graphql, HttpResponse } from 'msw';

import { loginUser } from './loginUser';

import type { HandlerContext, GraphQLResolverExtras, CreateHandler } from '..';
import type { IMutation } from '@trastocker/graphql-definition';

const handlers = {
  loginUser,
};

export const createMutationHandlers: CreateHandler[] = [
  ...(Object.keys({
    ...handlers,
  }) as Array<keyof (typeof handlers)>).map(mutationName => (context: HandlerContext) => {
    const handler = handlers[mutationName];
    return graphql.mutation<
      {
        [key in typeof mutationName]: ReturnType<typeof handlers[typeof mutationName]>
      },
      Parameters<typeof handlers[typeof mutationName]>[0]['variables']
    > (mutationName, (args) => {
      return HttpResponse.json({
        data: {
          [mutationName]: handler(args, context),
        },
      });
    });
  }),
];

export type MutationHandler<
  T extends keyof Omit<IMutation, '__typename'>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  V extends Record<string, any>,
> = (info: GraphQLResolverExtras<V>, context: HandlerContext) => IMutation[T];
