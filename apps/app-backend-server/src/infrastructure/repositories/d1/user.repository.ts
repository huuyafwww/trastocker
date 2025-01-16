import { schema } from '@trastocker/database-definition';
import { eq, and, isNull, inArray } from 'drizzle-orm';
import { injectable, inject } from 'inversify';

import { Users } from '@domain/collections/user.collection';
import { User } from '@domain/entities/user.entity';
import { UserRepository } from '@domain/repositories/user.repository';
import { UserEmail } from '@domain/value-objects/user/email.value-object';
import { UserId } from '@domain/value-objects/user/id.value-object';
import { UserPassword } from '@domain/value-objects/user/password.value-object';

import type { UserSelectColumns } from '@trastocker/database-definition';
import type { Database } from '@trastocker/database-definition';

const convert = (user: UserSelectColumns): User => {
  return new User({
    id: UserId.fromString(user.id),
    name: user.name,
    email: UserEmail.fromString(user.email),
    password: UserPassword.fromString(user.password),
    registeredAt: user.registeredAt,
    verifiedAt: user.verifiedAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    deletedAt: user.deletedAt,
  });
};

@injectable()
export class D1UserRepository extends UserRepository {
  constructor(
    @inject('D1Database') private database: Database,
  ) {
    super();
  }

  async save(user: User): Promise<User> {
    if (!!(await this.findById(user.id))) {
      const rows = await this.database.update(schema.user).set({
        name: user.name,
        email: user.email.toString(),
        password: user.password.toString(),
        registeredAt: user.registeredAt,
        verifiedAt: user.verifiedAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
      }).where(and(
        eq(schema.user.id, user.id.toString()),
        isNull(schema.user.deletedAt),
      )).returning();

      const row = rows[0];
      if (!row) throw new Error('Failed to update user');
      return convert(row);
    }

    const rows = await this.database.insert(schema.user).values([{
      ...user.serialize(),
    }]).returning();

    const row = rows[0];
    if (!row) throw new Error('Failed to insert user');
    return convert(row);
  }

  async findById(id: UserId): Promise<User | null> {
    const row = await this.database.query.user.findFirst({
      where: and(
        eq(schema.user.id, id.toString()),
      ),
    });
    if (!row) return null;
    return convert(row);
  }

  async findByIds(ids: UserId[]): Promise<Users> {
    const rows = await this.database.query.user.findMany({
      where: and(
        inArray(schema.user.id, ids.map(id => id.toString())),
        isNull(schema.user.deletedAt),
      ),
    });
    return Users.from(rows.map(convert));
  }

  async findByEmail(email: UserEmail): Promise<User | null> {
    const row = await this.database.query.user.findFirst({
      where: and(
        eq(schema.user.email, email.toString()),
      ),
    });
    if (!row) return null;
    return convert(row);
  }
}
