import { schema } from '@trastocker/database-definition';

import { Workspace } from '@domain/entities/workspace.entity';
import { WorkspaceInviteCode } from '@domain/value-objects/workspace/invite-code.value-object';
import { WorkspaceName } from '@domain/value-objects/workspace/name.value-object';

import type { Seeder } from './index';

export const workspace = Workspace.create({
  name: WorkspaceName.fromString('workspace'),
  inviteCode: WorkspaceInviteCode.generate(),
});

export const workspaces: Seeder = async (database) => {
  await database.delete(schema.workspace);
  await database.insert(schema.workspace).values({
    ...workspace.serialize(),
  });
};
