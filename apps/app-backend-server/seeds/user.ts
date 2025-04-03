import { schema } from '@trastocker/database-definition';

import { User } from '@domain/entities/user.entity';
import { UserEmail } from '@domain/value-objects/user/email.value-object';
import { UserName } from '@domain/value-objects/user/name.value-object';
import { UserPassword } from '@domain/value-objects/user/password.value-object';

import type { Seeder } from './index';

export const adminUser = User.create({
  name: UserName.fromString('adminUser'),
  email: UserEmail.fromString('admin@admin.com'),
  password: UserPassword.fromRawString('t2t2tN{b((t&'),
  verifiedAt: new Date(),
});

const generalUser = User.create({
  name: UserName.fromString('generalUser'),
  email: UserEmail.fromString('general@general.com'),
  password: UserPassword.fromRawString('t2t2tN{b((t&'),
  verifiedAt: new Date(),
});

export const users: Seeder = (database) => {
  database.insert(schema.user).values({
    ...adminUser.serialize(),
  });
  database.insert(schema.user).values({
    ...generalUser.serialize(),
  });
};
