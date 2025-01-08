import { schema } from '@trastocker/database-definition';
import { and, eq, isNull, isNotNull } from 'drizzle-orm';
import { graphql, HttpResponse } from 'msw';

import type { CreateHandler } from '../';
import type { IMutation } from '@trastocker/graphql-definition';
import type { IMutationLoginUserArgs } from '@trastocker/graphql-definition';

export const loginUser: CreateHandler = ({ promiseDatabase }) => {
  return graphql.mutation<
    { loginUser: IMutation['loginUser'] },
    IMutationLoginUserArgs
  >('loginUser', async ({ variables }) => {
    const user = await (await promiseDatabase).query.user.findFirst({
      where: and(
        eq(schema.user.email, variables.email),
        isNull(schema.user.deletedAt),
        isNotNull(schema.user.verifiedAt),
      ),
    });
    if (!user || !user.id) {
      return HttpResponse.json({
        data: { loginUser: null },
      });
    }
    return HttpResponse.json({
      data: {
        loginUser: user,
      },
    });
  });
};
