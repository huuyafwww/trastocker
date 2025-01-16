import { User } from '@domain/entities/user.entity';
import { GetWorkspaceJoinedUsersService } from '@domain/services/get-workspace-joined-users.service';

import type { FieldType } from '.';

export const users = (t: FieldType) => t.field({
  type: [User],
  description: 'Users',
  resolve: async (parent, _, context) => {
    return await context.container.get(GetWorkspaceJoinedUsersService).execute({ id: parent.id });
  },
});
