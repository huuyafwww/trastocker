import { schema } from '@trastocker/database-definition';

import { WorkspaceUser } from '@domain/entities/workspace-user.entity';

import { adminUser } from './user';
import { workspace } from './workspace';

import type { Seeder } from './index';

const workspaceUser = WorkspaceUser.create({
  userId: adminUser.id,
  workspaceId: workspace.id,
});

export const workspaceUsers: Seeder = async (database) => {
  await database.insert(schema.workspaceUser).values({
    ...workspaceUser.serialize(),
  });
};
