import { INJECT_KEYS } from '@constants/inject-key';
import { User } from '@domain/entities/user.entity';

import type { FieldType } from '.';
import type { GetWorkspaceJoinedUsersService } from '@domain/services/get-workspace-joined-users.service';

export const users = (t: FieldType) => t.field({
  type: [User],
  description: 'Users',
  resolve: async (parent, _, context) => {
    return await context.container.get<GetWorkspaceJoinedUsersService>(INJECT_KEYS.GetWorkspaceJoinedUsersService).execute({ id: parent.id });
  },
});
