import { injectable, inject } from 'inversify';

import { UserTokenRepository } from '@domain/repositories/user-token.repository';
import { UserRepository } from '@domain/repositories/user.repository';
import { UserTokenAccessToken } from '@domain/value-objects/user-token/access-token.value-object';

import type { User } from '@domain/entities/user.entity';

export type GetAuthUserUseCaseProps = {
  accessToken: string;
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

    const user = await this.userRepository.findById(decodedAccessToken.userId);
    if (!user) throw new Error('User not found');
    if (user.email.isEqual(decodedAccessToken.email)) throw new Error('Invalid access token');
    if (accessToken.canVerify()) return user;

    const userToken = await this.userTokenRepository.findByUserId(decodedAccessToken.userId);
    if (!userToken) throw new Error('User token not found');
    if (!userToken.refreshToken.canVerify()) throw new Error('Refresh token is expired');

    await this.userTokenRepository.save(userToken.renewAccessToken({
      email: user.email,
    }));
    return user;
  }
}
