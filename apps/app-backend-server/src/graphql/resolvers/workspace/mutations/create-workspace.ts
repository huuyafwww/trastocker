import { WorkspaceNameSchema } from '@trastocker/validation-schema-definition';

import { Workspace } from '@domain/entities/workspace.entity';
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
    return (
      await (context.container.get<CreateWorkspaceByNameService>(CreateWorkspaceByNameService)).execute({
        name: args.name,
      })
    );
  },
}));
