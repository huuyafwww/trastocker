import { User } from '@domain/entities/user.entity';
import { builder } from '@graphql/builder';

builder.queryField('authUser', t => t.field({
  type: User,
  nullable: true,
  description: 'get Authenticated User',
  resolve: (_, __, context) => {
    if (!context.authUser) throw new Error('Unauthorized');
    return context.authUser;
  },
}));
