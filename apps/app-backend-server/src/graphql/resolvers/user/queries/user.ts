import { UserRepository } from '@domain/repositories/user.repository';
import { UserId } from '@domain/value-objects/user/id.value-object';
import { builder } from '@graphql/builder';

import { User } from '../types/user';

builder.queryField('user', t => t.field({
  type: User,
  description: 'get User by ID',
  args: {
    userId: t.arg.id({ description: 'User ID' }),
  },
  resolve: async (_, args, context) => {
    const userId = UserId.fromString(args.userId);
    const user = await (context.container.get<UserRepository>(UserRepository)).findById(userId);
    if (!user) throw new Error('User not found');
    return user.serialize();
  },
}));
