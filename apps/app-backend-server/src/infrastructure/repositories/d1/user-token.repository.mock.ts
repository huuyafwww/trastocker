import { injectable } from 'inversify';

import { UserToken } from '@domain/entities/user-token.entity';
import { UserTokenRepository } from '@domain/repositories/user-token.repository';
import { UserId } from '@domain/value-objects/user/id.value-object';
import { UserTokenAccessToken } from '@domain/value-objects/user-token/access-token.value-object';
import { UserTokenId } from '@domain/value-objects/user-token/id.value-object';
import { UserTokenRefreshToken } from '@domain/value-objects/user-token/refresh-token.value-object';
import { mockedUserToken } from '@test/fixtures/user-token.fixture';

@injectable()
export class D1UserTokenRepository extends UserTokenRepository {
  constructor(
  ) {
    super();
  }

  // eslint-disable-next-line
  async save(userToken: UserToken): Promise<UserToken> {
    return mockedUserToken;
  }

  // eslint-disable-next-line
  async findById(id: UserTokenId): Promise<UserToken | null> {
    return mockedUserToken;
  }

  // eslint-disable-next-line
  async findByUserId(userId: UserId): Promise<UserToken | null> {
    return mockedUserToken;
  }

  // eslint-disable-next-line
  async findByAccessToken(accessToken: UserTokenAccessToken): Promise<UserToken | null> {
    return mockedUserToken;
  }

  // eslint-disable-next-line
  async findByRefreshToken(refreshToken: UserTokenRefreshToken): Promise<UserToken | null> {
    return mockedUserToken;
  }
}
