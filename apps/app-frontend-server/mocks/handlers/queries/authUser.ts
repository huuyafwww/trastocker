import { schema } from '@trastocker/database-definition';
import { and, isNotNull, isNull } from 'drizzle-orm';
import { graphql, HttpResponse } from 'msw';

import type { CreateHandler } from '..';
import type { IQuery } from '@trastocker/graphql-definition';

export const authUser: CreateHandler = ({ promiseDatabase }) => {
  return graphql.query<
    { user: IQuery['authUser'] },
    {}
  >('authUser', async () => {
    return HttpResponse.json({
      data: {
        user: await (await promiseDatabase).query.user.findFirst({
          where: and(
            isNull(schema.user.deletedAt),
            isNotNull(schema.user.verifiedAt),
          ),
        }) ?? null,
      },
    });
  });
};
