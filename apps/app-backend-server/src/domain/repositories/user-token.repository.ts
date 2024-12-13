import type { UserToken } from '@domain/entities/user-token.entity';
import type { UserId } from '@domain/value-objects/user/id.value-object';
import type { UserTokenAccessToken } from '@domain/value-objects/user-token/access-token.value-object';
import type { UserTokenRefreshToken } from '@domain/value-objects/user-token/refresh-token.value-object';

export abstract class UserTokenRepository {
  abstract save(userToken: UserToken): Promise<UserToken>;
  abstract findByUserId(id: UserId): Promise<UserToken | null>;
  abstract findByAccessToken(accessToken: UserTokenAccessToken): Promise<UserToken | null>;
  abstract findByRefreshToken(refreshToken: UserTokenRefreshToken): Promise<UserToken | null>;
}
