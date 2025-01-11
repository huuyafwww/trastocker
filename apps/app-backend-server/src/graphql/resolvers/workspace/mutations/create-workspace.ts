import { WorkspaceNameSchema } from '@trastocker/validation-schema-definition';

import { CreateWorkspaceByNameService } from '@domain/services/create-workspace-by-name.service';
import { builder } from '@graphql/builder';

import { Workspace } from '../types/workspace';

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
    )?.serialize();
  },
}));
