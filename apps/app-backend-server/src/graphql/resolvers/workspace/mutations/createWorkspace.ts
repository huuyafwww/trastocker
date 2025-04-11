import { WorkspaceNameSchema } from '@trastocker/validation-schema-definition';

import { INJECT_KEY } from '@constants/inject-key';
import { Workspace } from '@domain/entities/workspace.entity';
import { builder } from '@graphql/builder';

import type { AssignWorkspaceByIdService } from '@domain/services/assign-workspace-by-id.service';
import type { CreateWorkspaceByNameService } from '@domain/services/create-workspace-by-name.service';

builder.mutationField('createWorkspace', t => t.field({
  type: Workspace,
  nullable: false,
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

    const workspace = await (context.container.get<CreateWorkspaceByNameService>(INJECT_KEY.CreateWorkspaceByNameService)).execute({
      name: args.name,
    });
    if (!workspace) throw new Error('Workspace not created');

    return await (context.container.get<AssignWorkspaceByIdService>(INJECT_KEY.AssignWorkspaceByIdService)).execute({
      userId: context.authUser.id.toString(),
      workspaceId: workspace.id.toString(),
    });
  },
}));
