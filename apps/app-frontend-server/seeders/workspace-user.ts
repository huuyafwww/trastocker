import { schema } from '@trastocker/database-definition';
import { and, isNull, isNotNull, eq, not } from 'drizzle-orm';

import type { Seeder } from './index';

export const workspaceUsers: Seeder = async (database, context) => {
  let id = 1;
  const verifiedUser = await database.query.user.findFirst({
    where: and(
      isNull(schema.user.deletedAt),
      isNotNull(schema.user.verifiedAt),
    ),
  });

  const activeWorkspaces = await database.query.workspace.findMany({
    where: and(
      isNull(schema.user.deletedAt),
    ),
  });

  if (!verifiedUser) throw new Error('Verified user not found');

  await Promise.all(activeWorkspaces.slice(1).map((workspace) => {
    return database.insert(schema.workspaceUser).values({
      id: String(id++),
      createdAt: context.now,
      updatedAt: context.now,
      deletedAt: null,
      userId: verifiedUser.id,
      workspaceId: workspace.id,
    });
  }));

  const otherVerifiedUser = await database.query.user.findFirst({
    where: and(
      not(eq(schema.user.id, verifiedUser.id)),
      isNull(schema.user.deletedAt),
      isNotNull(schema.user.verifiedAt),
    ),
  });

  if (!otherVerifiedUser) throw new Error('Verified user not found');

  // deleted workspaceUser
  await Promise.all(activeWorkspaces.slice(0, 1).map((workspace) => {
    return database.insert(schema.workspaceUser).values({
      id: String(id++),
      createdAt: context.now,
      updatedAt: context.now,
      deletedAt: context.now,
      userId: otherVerifiedUser.id,
      workspaceId: workspace.id,
    });
  }));
};
