import { builder } from '@graphql/builder';

export const Workspace = builder.simpleObject('Workspace', {
  description: 'Workspace',
  fields: t => ({
    id: t.id({ description: 'Workspace ID' }),
    name: t.string({ description: 'Workspace Name' }),
    inviteCode: t.string({ description: 'Workspace Invite Code' }),
  }),
});
