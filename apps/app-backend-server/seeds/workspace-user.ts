import { schema } from '@trastocker/database-definition';

import { WorkspaceUser } from '@domain/entities/workspace-user.entity';

import { user } from './user';
import { workspace } from './workspace';

import type { Seeder } from './index';

const workspaceUser = WorkspaceUser.create({
  userId: user.id,
  workspaceId: workspace.id,
});

export const workspaceUsers: Seeder = async (database) => {
  await database.delete(schema.workspaceUser);
  await database.insert(schema.workspaceUser).values({
    ...workspaceUser.serialize(),
  });
};
