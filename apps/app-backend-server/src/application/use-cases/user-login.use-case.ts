import { injectable, inject } from 'inversify';

import { UserToken } from '@domain/entities/user-token.entity';
import { User } from '@domain/entities/user.entity';
import { UserTokenRepository } from '@domain/repositories/user-token.repository';
import { UserRepository } from '@domain/repositories/user.repository';
import { UserEmail } from '@domain/value-objects/user/email.value-object';
import { UserTokenAccessToken } from '@domain/value-objects/user-token/access-token.value-object';
import { UserTokenRefreshToken } from '@domain/value-objects/user-token/refresh-token.value-object';

export type UserLoginUseCaseProps = {
  email: string;
  password: string;
};

export type UserLoginUseCaseOutput = {
  user: User | null;
  userToken: UserToken | null;
};

@injectable()
export class UserLoginUseCase {
  constructor(
    @inject(UserRepository) private userRepository: UserRepository,
    @inject(UserTokenRepository) private userTokenRepository: UserTokenRepository,
  ) {
  }

  async execute(props: UserLoginUseCaseProps): Promise<UserLoginUseCaseOutput> {
    const email = UserEmail.fromString(props.email);
    const user = await this.userRepository.findByEmail(email);
    if (!user || !user.isVerified || user.isDeleted) return { user: null, userToken: null };

    if (!user.password.isEqual(props.password)) return { user: null, userToken: null };

    const userToken = await this.userTokenRepository.findByUserId(user.id);

    // ユーザートークンが存在しない場合は新しいトークンを生成して返す
    if (!userToken) {
      const accessToken = UserTokenAccessToken.generate({
        userId: user.id,
        email: user.email,
      });

      const refreshToken = UserTokenRefreshToken.generate({
        userId: user.id,
        email: user.email,
      });

      const userToken = UserToken.create({
        userId: user.id,
        accessToken,
        refreshToken,
      });

      return {
        user,
        userToken: await this.userTokenRepository.save(userToken),
      };
    }

    // アクセストークンもリフレッシュトークンも有効な場合はそのまま返す
    if (userToken.accessToken.canVerify() && userToken.refreshToken.canVerify()) {
      return { user, userToken };
    }

    // アクセストークンが無効でリフレッシュトークンが有効な場合はアクセストークンを更新して返す
    if (!userToken.accessToken.canVerify() && userToken.refreshToken.canVerify()) {
      return {
        user,
        userToken: await this.userTokenRepository.save(userToken.renewAccessToken({
          email: user.email,
        })),
      };
    }

    // アクセストークンもリフレッシュトークンも無効な場合はユーザートークンを削除して新しいトークンを生成して返す
    await this.userTokenRepository.save(userToken.delete());

    const accessToken = UserTokenAccessToken.generate({
      userId: user.id,
      email: user.email,
    });

    const refreshToken = UserTokenRefreshToken.generate({
      userId: user.id,
      email: user.email,
    });

    return {
      user,
      userToken: await this.userTokenRepository.save(UserToken.create({
        userId: user.id,
        accessToken,
        refreshToken,
      })),
    };
  }
}
