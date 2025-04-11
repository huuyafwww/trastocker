import { WorkspaceInviteCodeSchema } from '@trastocker/validation-schema-definition';

import { INJECT_KEY } from '@constants/inject-key';
import { Workspace } from '@domain/entities/workspace.entity';
import { builder } from '@graphql/builder';

import type { AssignWorkspaceByInviteCodeService } from '@domain/services/assign-workspace-by-invite-code.service';

builder.mutationField('joinWorkspace', t => t.field({
  type: Workspace,
  nullable: true,
  description: 'Join workspace',
  args: {
    inviteCode: t.arg.string({
      description: 'Workspace Invite Code',
      required: true,
      validate: { schema: WorkspaceInviteCodeSchema },
    }),
  },
  resolve: async (_, args, context) => {
    if (!context.authUser) throw new Error('Unauthorized');

    return await (context.container.get<AssignWorkspaceByInviteCodeService>(INJECT_KEY.AssignWorkspaceByInviteCodeService)).execute({
      inviteCode: args.inviteCode,
      userId: context.authUser.id.toString(),
    });
  },
}));
