import { createMutationHandlers } from './mutations';
import { createQueryHandlers } from './queries';

import type { Database } from '../';
import type { GraphQLHandler } from 'msw';

export type HandlerContext = {
  promiseDatabase: Promise<Database>;
};
export type CreateHandler = (context: HandlerContext) => GraphQLHandler;

export const createHandlers: CreateHandler[] = [
  ...createQueryHandlers,
  ...createMutationHandlers,
];
