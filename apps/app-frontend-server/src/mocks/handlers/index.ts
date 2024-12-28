import { createMutationHandlers } from './mutations';
import { createQueryHandlers } from './queries';

import type { Database } from '../data';
import type { GraphQLHandler } from 'msw';

export type HandlerContext = {
  database: Database;
};
export type CreateHandler = (context: HandlerContext) => GraphQLHandler;

export const createHandlers: CreateHandler[] = [
  ...createQueryHandlers,
  ...createMutationHandlers,
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GraphQLResolverExtras<Variables extends Record<string, any>> = {
  request: {
    headers: Headers;
  };
  requestId: string;
  query: string;
  operationName: string;
  variables: Variables;
  cookies: Record<string, string>;
};
