import { schema } from '@trastocker/database-definition';

import type { Seeder } from './index';

export const users: Seeder = async (database, context) => {
  let id = 1;

  // registered users
  for (; id <= 5; id++) {
    await database.insert(schema.user).values({
      id: String(id),
      createdAt: context.now,
      updatedAt: context.now,
      deletedAt: null,
      name: `User-${id}`,
      email: `example+${id}@example.com`,
      password: 't2t2tN{b((t&',
      registeredAt: context.now,
      verifiedAt: null,
    });
  }

  // verified users
  for (; id <= 15; id++) {
    await database.insert(schema.user).values({
      id: String(id),
      createdAt: context.now,
      updatedAt: context.now,
      deletedAt: null,
      name: `User-${id}`,
      email: `example+${id}@example.com`,
      password: 't2t2tN{b((t&',
      registeredAt: context.now,
      verifiedAt: context.now,
    });
  }

  // deleted users
  for (; id <= 20; id++) {
    await database.insert(schema.user).values({
      id: String(id),
      createdAt: context.now,
      updatedAt: context.now,
      deletedAt: context.now,
      name: `User-${id}`,
      email: `example+${id}@example.com`,
      password: 't2t2tN{b((t&',
      registeredAt: context.now,
      verifiedAt: context.now,
    });
  }
};
