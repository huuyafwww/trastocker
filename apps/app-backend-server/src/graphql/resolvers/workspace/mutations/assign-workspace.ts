import { WorkspaceInviteCodeSchema } from '@trastocker/validation-schema-definition';

import { Workspace } from '@domain/entities/workspace.entity';
import { AssignWorkspaceByInviteCodeService } from '@domain/services/assign-workspace-by-invite-code.service';
import { builder } from '@graphql/builder';

builder.mutationField('assignWorkspace', t => t.field({
  type: Workspace,
  nullable: true,
  description: 'Assign workspace',
  args: {
    inviteCode: t.arg.string({
      description: 'Workspace Invite Code',
      required: true,
      validate: { schema: WorkspaceInviteCodeSchema },
    }),
  },
  resolve: async (_, args, context) => {
    if (!context.authUser) throw new Error('Unauthorized');

    const workspace = await (context.container.get<AssignWorkspaceByInviteCodeService>(AssignWorkspaceByInviteCodeService)).execute({
      inviteCode: args.inviteCode,
      userId: context.authUser.id.toString(),
    });
    if (!workspace) throw new Error('Failed to assign workspace');

    return workspace;
  },
}));
