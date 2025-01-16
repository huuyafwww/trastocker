import { idSchema } from '@trastocker/validation-schema-definition';

import { Workspace } from '@domain/entities/workspace.entity';
import { WorkspaceRepository } from '@domain/repositories/workspace.repository';
import { AssignUserToWorkspaceService } from '@domain/services/assign-user-to-workspace.service';
import { builder } from '@graphql/builder';

builder.mutationField('assignUserToWorkspace', t => t.field({
  type: Workspace,
  nullable: true,
  description: 'Assign user to workspace',
  args: {
    userId: t.arg.string({
      description: 'User ID',
      required: true,
      validate: { schema: idSchema },
    }),
    workspaceId: t.arg.string({
      description: 'Workspace ID',
      required: true,
      validate: { schema: idSchema },
    }),
  },
  resolve: async (_, args, context) => {
    const workspaceUser = await (context.container.get<AssignUserToWorkspaceService>(AssignUserToWorkspaceService)).execute({
      userId: args.userId,
      workspaceId: args.workspaceId,
    });
    if (!workspaceUser) throw new Error('Failed to assign user to workspace');

    return await (
      context.container.get<WorkspaceRepository>(WorkspaceRepository)
    ).findById(workspaceUser.workspaceId);
  },
}));
