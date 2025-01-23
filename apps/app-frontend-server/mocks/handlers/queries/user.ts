import { schema } from '@trastocker/database-definition';
import { and, eq, inArray, isNull } from 'drizzle-orm';
import { graphql, HttpResponse } from 'msw';

import type { CreateHandler } from '../';
import type { IQueryUserArgs } from '@trastocker/graphql-definition';
import type { IQuery } from '@trastocker/graphql-definition';

export const user: CreateHandler = ({ promiseDatabase }) => {
  return graphql.query<
    { user: IQuery['user'] },
    IQueryUserArgs
  >('user', async ({ variables }) => {
    const user = await (await promiseDatabase).query.user.findFirst({
      where: eq(schema.user.id, variables.userId),
    });

    if (!user) {
      return HttpResponse.json({
        data: { user: null },
      });
    }

    const workspaceUsers = await (await promiseDatabase).query.workspaceUser.findMany({
      where: and(
        eq(schema.workspaceUser.userId, user.id),
        isNull(schema.workspace.deletedAt),
      ),
    });

    const workspaces = await (await promiseDatabase).query.workspace.findMany({
      where: and(
        inArray(schema.workspace.id, workspaceUsers.map(workspaceUser => workspaceUser.workspaceId)),
        isNull(schema.workspace.deletedAt),
      ),
    });

    return HttpResponse.json({
      data: {
        user: {
          ...user,
          isDeleted: user.deletedAt !== null,
          // @ts-expect-error Because of circular reference
          workspaces: workspaces.map(workspace => ({
            ...workspace,
            isDeleted: workspace.deletedAt !== null,
          })),
        },
      },
    });
  });
};
