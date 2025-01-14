import { Entity } from '@domain/entities/entity';
import { UserId } from '@domain/value-objects/user/id.value-object';

import type { Fields } from '@domain/entities/entity';
import type { UserEmail } from '@domain/value-objects/user/email.value-object';
import type { UserPassword } from '@domain/value-objects/user/password.value-object';

export type SerializedUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  registeredAt: Date;
  verifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export class User extends Entity<UserId> {
  declare public readonly name: string;
  declare public readonly email: UserEmail;
  declare public readonly password: UserPassword;
  declare public readonly registeredAt: Date;
  declare public readonly verifiedAt: Date | null;
  declare public readonly createdAt: Date;
  declare public readonly updatedAt: Date;
  declare public readonly deletedAt: Date | null;

  public constructor(props: Fields<User>) {
    super(props);
  }

  public static create(props: Omit<Fields<User>, 'id' | 'registeredAt' | 'createdAt' | 'updatedAt' | 'deletedAt'>): User {
    return new User({
      id: UserId.generate(),
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

  public get isVerified(): boolean {
    return this.verifiedAt !== null;
  }

  public get isDeleted(): boolean {
    return this.deletedAt !== null;
  }

  public update(props: Partial<Fields<User>>): User {
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
      name: this.name,
      email: this.email.toString(),
      password: this.password.toString(),
      registeredAt: this.registeredAt,
      verifiedAt: this.verifiedAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
