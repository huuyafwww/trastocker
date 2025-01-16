import { Workspace } from '@domain/entities/workspace.entity';
import { GetUserJoinedWorkspacesService } from '@domain/services/get-user-joined-workspaces.service';

import type { FieldType } from '.';

export const workspaces = (t: FieldType) => t.field({
  type: [Workspace],
  description: 'Workspaces',
  resolve: async (parent, _, context) => {
    return await context.container.get(GetUserJoinedWorkspacesService).execute({ id: parent.id });
  },
});
