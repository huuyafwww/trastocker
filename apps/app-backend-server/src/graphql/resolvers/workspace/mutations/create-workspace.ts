import { WorkspaceNameSchema } from '@trastocker/validation-schema-definition';

import { Workspace } from '@domain/entities/workspace.entity';
import { AssignWorkspaceByIdService } from '@domain/services/assign-workspace-by-id.service';
import { CreateWorkspaceByNameService } from '@domain/services/create-workspace-by-name.service';
import { builder } from '@graphql/builder';

builder.mutationField('createWorkspace', t => t.field({
  type: Workspace,
  nullable: true,
  description: 'create Workspace',
  args: {
    name: t.arg.string({
      description: 'Workspace name',
      required: true,
      validate: { schema: WorkspaceNameSchema },
    }),
  },
  resolve: async (_, args, context) => {
    if (!context.authUser) throw new Error('Unauthorized');

    const workspace = await (context.container.get<CreateWorkspaceByNameService>(CreateWorkspaceByNameService)).execute({
      name: args.name,
    });
    if (!workspace) throw new Error('Workspace not created');

    await (context.container.get<AssignWorkspaceByIdService>(AssignWorkspaceByIdService)).execute({
      userId: context.authUser.id.toString(),
      workspaceId: workspace.id.toString(),
    });
    return workspace;
  },
}));
