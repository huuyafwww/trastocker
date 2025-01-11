import { schema } from '@trastocker/database-definition';

import type { Seeder } from './index';

export const workspaces: Seeder = async (database, context) => {
  let id = 1;
  for (; id <= 5; id++) {
    await database.insert(schema.workspace).values({
      id: String(id),
      createdAt: context.now,
      updatedAt: context.now,
      deletedAt: null,
      name: `Workspace-${id}`,
      inviteCode: `ABCDEFG${id}`,
    });
  }

  // deleted workspaces
  for (; id <= 9; id++) {
    await database.insert(schema.workspace).values({
      id: String(id),
      createdAt: context.now,
      updatedAt: context.now,
      deletedAt: context.now,
      name: `Workspace-${id}`,
      inviteCode: `ABCDEFG${id}`,
    });
  }
};
