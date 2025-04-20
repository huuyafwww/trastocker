import { INJECT_KEY } from '@constants/inject-key';
import { User } from '@domain/entities/user.entity';
import { UserId } from '@domain/value-objects/user/id.value-object';
import { builder } from '@graphql/builder';

import type { UserRepository } from '@domain/repositories/user.repository';

builder.queryField('user', t => t.field({
  type: User,
  nullable: true,
  description: 'get User by ID',
  args: {
    userId: t.arg.id({ description: 'User ID' }),
  },
  resolve: async (_, args, context) => {
    const userId = UserId.fromString(args.userId);
    const user = await (context.container.get<UserRepository>(INJECT_KEY.UserRepository)).findById(userId);
    return user;
  },
}));
