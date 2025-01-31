import { schema } from '@trastocker/database-definition';
import { and, eq, inArray, isNotNull, isNull } from 'drizzle-orm';
import { graphql, HttpResponse } from 'msw';

import type { CreateHandler } from '..';
import type { IQuery } from '@trastocker/graphql-definition';

export const authUser: CreateHandler = ({ promiseDatabase }) => {
  return graphql.query<
    { authUser: IQuery['authUser'] },
    {}
  >('authUser', async () => {
    const user = await (await promiseDatabase).query.user.findFirst({
      where: and(
        isNull(schema.user.deletedAt),
        isNotNull(schema.user.verifiedAt),
      ),
    });

    if (!user) {
      return HttpResponse.json({
        data: { authUser: null },
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

    if (workspaces.length === 0) {
      return HttpResponse.json({
        data: {
          authUser: {
            ...user,
            isDeleted: user.deletedAt !== null,
            workspaces: [],
          },
        },
      });
    }

    return HttpResponse.json({
      data: {
        authUser: {
          ...user,
          isDeleted: user.deletedAt !== null,
          workspaces: workspaces.map(workspace => ({
            ...workspace,
            isDeleted: workspace.deletedAt !== null,
            users: [],
          })),
        },
      },
    });
  });
};
