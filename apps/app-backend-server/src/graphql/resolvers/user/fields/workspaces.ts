import { INJECT_KEY } from '@constants/inject-key';
import { Workspace } from '@domain/entities/workspace.entity';

import type { FieldType } from '.';
import type { GetUserJoinedWorkspacesService } from '@domain/services/get-user-joined-workspaces.service';

export const workspaces = (t: FieldType) => t.field({
  type: [Workspace],
  description: 'Workspaces',
  resolve: async (parent, _, context) => {
    return await context.container.get<GetUserJoinedWorkspacesService>(INJECT_KEY.GetUserJoinedWorkspacesService).execute({ id: parent.id });
  },
});
