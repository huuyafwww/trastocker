import { schema } from '@trastocker/database-definition';
import { eq, and, isNull } from 'drizzle-orm';
import { injectable, inject } from 'inversify';

import { UserToken } from '@domain/entities/user-token.entity';
import { UserTokenRepository } from '@domain/repositories/user-token.repository';
import { UserId } from '@domain/value-objects/user/id.value-object';
import { UserTokenAccessToken } from '@domain/value-objects/user-token/access-token.value-object';
import { UserTokenId } from '@domain/value-objects/user-token/id.value-object';
import { UserTokenRefreshToken } from '@domain/value-objects/user-token/refresh-token.value-object';
import { Repository } from '@infrastructure/repositories/d1/repository';

import type { UserTokenSelectColumns } from '@trastocker/database-definition';
import type { Database } from '@trastocker/database-definition';

const convert = (userToken: UserTokenSelectColumns): UserToken => {
  return new UserToken({
    id: UserTokenId.fromString(userToken.id),
    userId: UserId.fromString(userToken.userId),
    accessToken: UserTokenAccessToken.fromString(userToken.accessToken),
    refreshToken: UserTokenRefreshToken.fromString(userToken.refreshToken),
    createdAt: userToken.createdAt,
    updatedAt: userToken.updatedAt,
    deletedAt: userToken.deletedAt,
  });
};

@injectable()
export class D1UserTokenRepository extends Repository<UserToken, UserTokenId> implements UserTokenRepository {
  constructor(
    @inject('D1Database') private database: Database,
  ) {
    super();
  }

  async save(userToken: UserToken): Promise<UserToken> {
    if (!!(await this.findById(userToken.id))) {
      const rows = await this.database.update(schema.userToken).set({
        userId: userToken.userId.toString(),
        accessToken: userToken.accessToken.toString(),
        refreshToken: userToken.refreshToken.toString(),
        updatedAt: userToken.updatedAt,
        deletedAt: userToken.deletedAt,
      }).where(and(
        eq(schema.userToken.id, userToken.id.toString()),
        isNull(schema.userToken.deletedAt),
      )).returning();

      const row = rows[0];
      if (!row) throw new Error('Failed to update user');
      return convert(row);
    }

    const rows = await this.database.insert(schema.userToken).values([{
      ...userToken.serialize(),
    }]).returning();

    const row = rows[0];
    if (!row) throw new Error('Failed to insert user');
    return convert(row);
  }

  async findById(id: UserTokenId): Promise<UserToken | null> {
    const row = await this.database.query.userToken.findFirst({
      where: and(
        eq(schema.userToken.id, id.toString()),
        isNull(schema.userToken.deletedAt),
      ),
    });
    if (!row) return null;
    return convert(row);
  }

  async findByUserId(userId: UserId): Promise<UserToken | null> {
    const row = await this.database.query.userToken.findFirst({
      where: and(
        eq(schema.userToken.userId, userId.toString()),
        isNull(schema.userToken.deletedAt),
      ),
    });
    if (!row) return null;
    return convert(row);
  }

  async findByAccessToken(accessToken: UserTokenAccessToken): Promise<UserToken | null> {
    const row = await this.database.query.userToken.findFirst({
      where: and(
        eq(schema.userToken.accessToken, accessToken.toString()),
        isNull(schema.userToken.deletedAt),
      ),
    });
    if (!row) return null;
    return convert(row);
  }

  async findByRefreshToken(refreshToken: UserTokenRefreshToken): Promise<UserToken | null> {
    const row = await this.database.query.userToken.findFirst({
      where: and(
        eq(schema.userToken.refreshToken, refreshToken.toString()),
        isNull(schema.userToken.deletedAt),
      ),
    });
    if (!row) return null;
    return convert(row);
  }
}
