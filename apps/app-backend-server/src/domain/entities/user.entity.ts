import { UserId } from '@domain/value-objects/user/id.value-object';

import type { Fields } from '@domain/entities/entity';
import type { UserEmail } from '@domain/value-objects/user/email.value-object';
import type { UserPassword } from '@domain/value-objects/user/password.value-object';

type SerializedUser = {
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

export class User {
  public readonly id!: UserId;
  public readonly name!: string;
  public readonly email!: UserEmail;
  public readonly password!: UserPassword;
  public readonly registeredAt!: Date;
  public readonly verifiedAt: Date | null = null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt: Date | null = null;

  public constructor(props: Fields<User>) {
    Object.assign(this, props);
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

  public isVerified(): boolean {
    return this.verifiedAt !== null;
  }

  public isDeleted(): boolean {
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
