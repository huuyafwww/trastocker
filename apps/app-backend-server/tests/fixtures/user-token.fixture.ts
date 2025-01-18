import { UserToken } from '@domain/entities/user-token.entity';
import { UserTokenAccessToken } from '@domain/value-objects/user-token/access-token.value-object';
import { UserTokenId } from '@domain/value-objects/user-token/id.value-object';
import { UserTokenRefreshToken } from '@domain/value-objects/user-token/refresh-token.value-object';

import { mockedUserId, mockedUserEmail } from './user.fixture';

export const mockedUserTokenId = UserTokenId.generate();
export const mockedUserTokenAccessToken = UserTokenAccessToken.generate({
  userId: mockedUserId,
  email: mockedUserEmail,
});
export const mockedUserTokenRefreshToken = UserTokenRefreshToken.generate({
  userId: mockedUserId,
  email: mockedUserEmail,
});

export const mockedUserTokenData = {
  id: mockedUserTokenId,
  userId: mockedUserId,
  accessToken: mockedUserTokenAccessToken,
  refreshToken: mockedUserTokenRefreshToken,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};
export const mockedUserToken = new UserToken(mockedUserTokenData);
