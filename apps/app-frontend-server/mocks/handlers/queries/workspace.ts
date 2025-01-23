import { schema } from '@trastocker/database-definition';
import { and, eq, inArray, isNull } from 'drizzle-orm';
import { graphql, HttpResponse } from 'msw';

import type { CreateHandler } from '../';
import type { IQueryWorkspaceArgs } from '@trastocker/graphql-definition';
import type { IQuery } from '@trastocker/graphql-definition';

export const workspace: CreateHandler = ({ promiseDatabase }) => {
  return graphql.query<
    { workspace: IQuery['workspace'] },
    IQueryWorkspaceArgs
  >('workspace', async ({ variables }) => {
    let workspace;

    if (variables.inviteCode) {
      workspace = await (await promiseDatabase).query.workspace.findFirst({
        where: and(
          eq(schema.workspace.inviteCode, variables.inviteCode),
          isNull(schema.workspace.deletedAt),
        ),
      });
    }

    if (variables.workspaceId) {
      workspace = await (await promiseDatabase).query.workspace.findFirst({
        where: and(
          eq(schema.workspace.id, variables.workspaceId),
          isNull(schema.workspace.deletedAt),
        ),
      });
    }

    if (!workspace) {
      return HttpResponse.json({
        data: { workspace: null },
      });
    }

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
        workspace: {
          ...workspace,
          isDeleted: workspace.deletedAt !== null,
          // @ts-expect-error Because of circular reference
          users: users.map(user => ({
            ...user,
            isDeleted: user.deletedAt !== null,
          })),
        },
      },
    });
  });
};
