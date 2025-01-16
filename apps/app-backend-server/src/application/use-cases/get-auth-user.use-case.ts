import { injectable, inject } from 'inversify';

import { UserTokenRepository } from '@domain/repositories/user-token.repository';
import { UserRepository } from '@domain/repositories/user.repository';
import { UserTokenAccessToken } from '@domain/value-objects/user-token/access-token.value-object';
import { UserTokenRefreshToken } from '@domain/value-objects/user-token/refresh-token.value-object';

import type { User } from '@domain/entities/user.entity';

export type GetAuthUserUseCaseProps = {
  accessToken: string;
  refreshToken: string;
};

@injectable()
export class GetAuthUserUseCase {
  constructor(
    @inject(UserRepository) private userRepository: UserRepository,
    @inject(UserTokenRepository) private userTokenRepository: UserTokenRepository,
  ) {
  }

  async execute(props: GetAuthUserUseCaseProps): Promise<User> {
    const accessToken = UserTokenAccessToken.fromString(props.accessToken);
    const decodedAccessToken = accessToken.decode();
    if (!decodedAccessToken) throw new Error('Invalid access token');

    const refreshToken = UserTokenRefreshToken.fromString(props.refreshToken);
    const decodedRefreshToken = refreshToken.decode();
    if (!decodedRefreshToken) throw new Error('Invalid refresh token');

    const user = await this.userRepository.findById(decodedAccessToken.userId);
    if (!user) throw new Error('User not found');
    if (!user.isVerified() || user.isDeleted()) throw new Error('User is not active');

    if (user.email.isEqual(decodedAccessToken.email)) throw new Error('Invalid access token');
    if (user.email.isEqual(decodedRefreshToken.email)) throw new Error('Invalid refresh token');

    if (accessToken.canVerify()) return user;
    if (!refreshToken.canVerify()) throw new Error('Refresh token is expired');

    const userToken = await this.userTokenRepository.findByUserId(user.id);
    if (!userToken) throw new Error('User token not found');

    await this.userTokenRepository.save(userToken.renewAccessToken({
      email: user.email,
    }));
    return user;
  }
}
