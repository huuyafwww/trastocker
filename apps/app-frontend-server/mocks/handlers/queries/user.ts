import { schema } from '@trastocker/database-definition';
import { eq } from 'drizzle-orm';
import { graphql, HttpResponse } from 'msw';

import type { CreateHandler } from '../';
import type { IQueryUserArgs } from '@trastocker/graphql-definition';
import type { IQuery } from '@trastocker/graphql-definition';

export const user: CreateHandler = ({ promiseDatabase }) => {
  return graphql.query<
    { user: IQuery['user'] },
    IQueryUserArgs
  >('user', async ({ variables }) => {
    return HttpResponse.json({
      data: {
        user: await (await promiseDatabase).query.user.findFirst({
          where: eq(schema.user.id, variables.userId),
        }) ?? null,
      },
    });
  });
};
