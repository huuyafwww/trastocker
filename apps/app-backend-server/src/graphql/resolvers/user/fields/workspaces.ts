import { Workspace } from '@domain/entities/workspace.entity';
import { GetJoinedWorkspacesByUserIdService } from '@domain/services/get-joined-workspaces-by-user-id.service';

import type { FieldType } from '.';

export const workspaces = (t: FieldType) => t.field({
  type: [Workspace],
  description: 'Workspaces',
  resolve: async (parent, _, context) => {
    return await context.container.get(GetJoinedWorkspacesByUserIdService).execute({ id: parent.id });
  },
});
