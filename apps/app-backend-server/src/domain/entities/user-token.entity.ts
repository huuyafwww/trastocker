import { Entity } from '@domain/entities/entity';
import { UserTokenAccessToken } from '@domain/value-objects/user-token/access-token.value-object';
import { UserTokenId } from '@domain/value-objects/user-token/id.value-object';

import type { Fields } from '@domain/entities/entity';
import type { UserEmail } from '@domain/value-objects/user/email.value-object';
import type { UserId } from '@domain/value-objects/user/id.value-object';
import type { UserTokenRefreshToken } from '@domain/value-objects/user-token/refresh-token.value-object';

type SerializedUserToken = {
  id: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export class UserToken extends Entity<UserTokenId> {
  public readonly userId!: UserId;
  public readonly accessToken!: UserTokenAccessToken;
  public readonly refreshToken!: UserTokenRefreshToken;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt: Date | null = null;

  public constructor(props: Fields<UserToken>) {
    super();
    Object.assign(this, props);
  }

  public static create(props: Omit<Fields<UserToken>, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): UserToken {
    return new UserToken({
      id: UserTokenId.generate(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      ...props,
    });
  }

  private update(props: Partial<Fields<UserToken>>): UserToken {
    return new UserToken({
      ...this,
      ...props,
      updatedAt: new Date(),
    });
  }

  public delete(): UserToken {
    return this.update({
      ...this,
      deletedAt: new Date(),
    });
  }

  public renewAccessToken(props: {
    email: UserEmail;
  }): UserToken {
    return this.update({
      accessToken: UserTokenAccessToken.generate({
        userId: this.userId,
        email: props.email,
      }),
    });
  }

  public serialize(): SerializedUserToken {
    return {
      id: this.id.toString(),
      userId: this.userId.toString(),
      accessToken: this.accessToken.toString(),
      refreshToken: this.refreshToken.toString(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
