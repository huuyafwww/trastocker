import { schema } from '@trastocker/database-definition';
import { and, eq, isNull, inArray } from 'drizzle-orm';
import { graphql, HttpResponse } from 'msw';

import type { CreateHandler } from '../';
import type { IMutation } from '@trastocker/graphql-definition';
import type { IMutationCreateWorkspaceArgs } from '@trastocker/graphql-definition';

export const createWorkspace: CreateHandler = ({ promiseDatabase }) => {
  return graphql.mutation<
    { createWorkspace: IMutation['createWorkspace'] },
    IMutationCreateWorkspaceArgs
  >('createWorkspace', async () => {
    const workspace = await (await promiseDatabase).query.workspace.findFirst({
      where: isNull(schema.workspace.deletedAt),
    });

    if (!workspace) throw new Error('Workspace not found');

    const workspaceUsers = await (await promiseDatabase).query.workspaceUser.findMany({
      where: and(
        eq(schema.workspaceUser.workspaceId, workspace.id),
        isNull(schema.workspace.deletedAt),
      ),
    });

    const users = await (await promiseDatabase).query.user.findMany({
      where: and(
        inArray(schema.user.id, workspaceUsers.map(workspaceUser => workspaceUser.userId)),
        isNull(schema.user.deletedAt),
      ),
    });

    return HttpResponse.json({
      data: {
        createWorkspace: {
          ...workspace,
          isDeleted: workspace.deletedAt !== null,
          // @ts-expect-error Because of circular reference
          users: users.map(user => ({
            ...workspace,
            isDeleted: user.deletedAt !== null,
          })),
        },
      },
    });
  });
};
