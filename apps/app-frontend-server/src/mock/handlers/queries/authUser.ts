import type { QueryHandler } from './';

export const user: QueryHandler<
  'authUser',
  {}
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
