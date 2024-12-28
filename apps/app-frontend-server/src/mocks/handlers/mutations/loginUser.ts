import type { MutationHandler } from '.';
import type { IMutationLoginUserArgs } from '@trastocker/graphql-definition';

export const loginUser: MutationHandler<
  'loginUser',
  IMutationLoginUserArgs
> = ({ variables }, { database }) => {
  return database.user.findFirst({
    where: {
      email: {
        equals: variables.email,
      },
    },
  });
};
