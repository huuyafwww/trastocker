import { builder } from '@graphql/builder';

export const User = builder.simpleObject('User', {
  description: 'User',
  fields: t => ({
    id: t.id({ description: 'User ID' }),
    name: t.string({ description: 'User Name' }),
    email: t.string({ description: 'User Email' }),
  }),
});
