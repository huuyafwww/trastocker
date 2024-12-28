import { builder } from '@graphql/builder';

import { User } from '../types/user';

builder.queryField('authUser', t => t.field({
  type: User,
  nullable: true,
  description: 'get Authenticated User',
  resolve: (_, __, context) => {
    if (!context.authUser) throw new Error('Unauthorized');
    return context.authUser.serialize();
  },
}));
