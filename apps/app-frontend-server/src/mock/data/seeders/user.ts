import type { Seeder } from './';

export const seedUser: Seeder = (database, context) => {
  let id = 1;

  // registered users
  for (; id <= 5; id++) {
    database.user.create({
      id: String(id),
      createdAt: context.ISODateString,
      updatedAt: context.ISODateString,
      deletedAt: null,
      name: `User-${id}`,
      email: `example+${id}@example.com`,
      registeredAt: context.ISODateString,
      verifiedAt: null,
    });
  }

  // verified users
  for (; id <= 15; id++) {
    database.user.create({
      id: String(id),
      createdAt: context.ISODateString,
      updatedAt: context.ISODateString,
      deletedAt: null,
      name: `User-${id}`,
      email: `example+${id}@example.com`,
      registeredAt: context.ISODateString,
      verifiedAt: context.ISODateString,
    });
  }

  // deleted users
  for (; id <= 20; id++) {
    database.user.create({
      id: String(id),
      createdAt: context.ISODateString,
      updatedAt: context.ISODateString,
      deletedAt: context.ISODateString,
      name: `User-${id}`,
      email: `example+${id}@example.com`,
      registeredAt: context.ISODateString,
      verifiedAt: context.ISODateString,
    });
  }
};
