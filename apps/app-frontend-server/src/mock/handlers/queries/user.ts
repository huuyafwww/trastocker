import type { QueryHandler } from './';
import type { IQueryUserArgs } from '@trastocker/graphql-definition';

export const user: QueryHandler<
  'user',
  IQueryUserArgs
> = (_, { database }) => {
  return database.user.findFirst({
    where: {
      deletedAt: {
        equals: null,
      },
      verifiedAt: {
        notEquals: null,
      },
    },
  });
};
