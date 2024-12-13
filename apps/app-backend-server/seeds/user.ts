import { schema } from '@trastocker/database-definition';

import { UserEmail } from '@domain/value-objects/user/email.value-object';
import { UserId } from '@domain/value-objects/user/id.value-object';
import { UserPassword } from '@domain/value-objects/user/password.value-object';

import type { Seeder } from './index';

export const users: Seeder = async (database) => {
  await database.delete(schema.user);
  await database.insert(schema.user).values([{
    id: (UserId.generate()).toString(),
    name: 'user',
    email: (UserEmail.fromString('admin@admin.com')).toString(),
    password: (UserPassword.fromRawString('t2t2tN{b((t&')).toString(),
    registeredAt: new Date(),
    verifiedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  }]);
};
