import { schema } from '@trastocker/database-definition';
import { and, eq, isNull, isNotNull, inArray } from 'drizzle-orm';
import { graphql, HttpResponse } from 'msw';

import type { CreateHandler } from '../';
import type { IMutation, IMutationVerifyUserArgs } from '@trastocker/graphql-definition';

export const verifyUser: CreateHandler = ({ promiseDatabase }) => {
  return graphql.mutation<
    { verifyUser: IMutation['verifyUser'] },
    IMutationVerifyUserArgs
  >('verifyUser', async ({ variables }) => {
    const user = await (await promiseDatabase).query.user.findFirst({
      where: and(
        eq(schema.user.verifyToken, variables.verifyToken),
        isNull(schema.user.deletedAt),
        isNotNull(schema.user.verifiedAt),
      ),
    });

    if (!user) {
      return HttpResponse.json({
        data: { verifyUser: null },
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
        verifyUser: {
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
