import { idSchema, WorkspaceInviteCodeSchema } from '@trastocker/validation-schema-definition';

import { Workspace } from '@domain/entities/workspace.entity';
import { WorkspaceRepository } from '@domain/repositories/workspace.repository';
import { WorkspaceId } from '@domain/value-objects/workspace/id.value-object';
import { WorkspaceInviteCode } from '@domain/value-objects/workspace/invite-code.value-object';
import { builder } from '@graphql/builder';

builder.queryField('workspace', t => t.field({
  type: Workspace,
  nullable: true,
  description: 'get Workspace',
  args: {
    workspaceId: t.arg.id({
      description: 'Workspace ID',
      required: false,
      validate: { schema: idSchema },
    }),
    inviteCode: t.arg.string({
      description: 'Workspace Invite code',
      required: false,
      validate: { schema: WorkspaceInviteCodeSchema },
    }),
  },
  resolve: async (_, args, context) => {
    if (args.workspaceId) {
      const workspaceId = WorkspaceId.fromString(args.workspaceId);
      const workspace = await (context.container.get<WorkspaceRepository>(WorkspaceRepository)).findById(workspaceId);
      if (!workspace) throw new Error('Workspace not found');
      return workspace;
    }

    if (args.inviteCode) {
      const inviteCode = WorkspaceInviteCode.fromString(args.inviteCode);
      const workspace = await (context.container.get<WorkspaceRepository>(WorkspaceRepository)).findByInviteCode(inviteCode);
      if (!workspace) throw new Error('Workspace not found');
      return workspace;
    }

    return null;
  },
}));
