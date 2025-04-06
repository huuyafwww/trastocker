import { Entity } from '@domain/entities/entity';
import { UserId } from '@domain/value-objects/user/id.value-object';
import { UserVerifyToken } from '@domain/value-objects/user/verify-token.value-object';

import type { UserEmail } from '@domain/value-objects/user/email.value-object';
import type { UserName } from '@domain/value-objects/user/name.value-object';
import type { UserPassword } from '@domain/value-objects/user/password.value-object';
import type { ClassFields } from '@trastocker/typescript-utility-helper';

export type SerializedUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  verifyToken: string;
  registeredAt: Date;
  verifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export class User extends Entity<UserId> {
  declare public readonly name: UserName;
  declare public readonly email: UserEmail;
  declare public readonly password: UserPassword;
  declare public readonly verifyToken: UserVerifyToken;
  declare public readonly registeredAt: Date;
  declare public readonly verifiedAt: Date | null;
  declare public readonly createdAt: Date;
  declare public readonly updatedAt: Date;
  declare public readonly deletedAt: Date | null;

  public constructor(props: ClassFields<User>) {
    super(props);
  }

  public static create(props: Omit<ClassFields<User>, 'id' | 'verifyToken' | 'registeredAt' | 'createdAt' | 'updatedAt' | 'deletedAt'>): User {
    const userId = UserId.generate();
    return new User({
      id: userId,
      verifyToken: UserVerifyToken.generate({
        userId,
        email: props.email,
      }),
      registeredAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      ...props,
    });
  }

  public verify(): User {
    return new User({
      ...this,
      verifiedAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public canVerify(): boolean {
    return !this.verifiedAt && !this.deletedAt;
  }

  public isVerified(): boolean {
    return this.verifiedAt !== null;
  }

  public isDeleted(): boolean {
    return this.deletedAt !== null;
  }

  public update(props: Partial<ClassFields<User>>): User {
    return new User({
      ...this,
      ...props,
      updatedAt: new Date(),
    });
  }

  public delete(): User {
    return new User({
      ...this,
      updatedAt: new Date(),
      deletedAt: new Date(),
    });
  }

  public serialize(): SerializedUser {
    return {
      id: this.id.toString(),
      name: this.name.toString(),
      email: this.email.toString(),
      password: this.password.toString(),
      verifyToken: this.verifyToken.toString(),
      registeredAt: this.registeredAt,
      verifiedAt: this.verifiedAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
