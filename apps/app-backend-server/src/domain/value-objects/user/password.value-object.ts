import { UserPasswordSchema } from '@trastocker/validation-schema-definition';
import bcrypt from 'bcryptjs';
import * as v from 'valibot';

export class InvalidUserPasswordError extends Error {
  public constructor(message = 'Invalid UserPassword') {
    super(message);
    this.name = 'InvalidUserPasswordError';
  }
}

export class UserPassword {
  private readonly value: string;
  private static readonly schema = UserPasswordSchema;

  protected constructor(value: string) {
    this.value = value;
  }

  public static fromRawString(value: string, options?: {
    rounds?: number;
  }): UserPassword {
    if (!UserPassword.isValid(value)) {
      throw new InvalidUserPasswordError();
    }
    return new this(bcrypt.hashSync(value, options?.rounds ?? 10));
  }

  public static fromString(value: string): UserPassword {
    return new this(value);
  }

  public static isValid(value: string): boolean {
    return v.safeParse(UserPassword.schema, value).success;
  }

  public toString(): string {
    return this.value;
  }

  public isEqual(password: string): boolean {
    return bcrypt.compareSync(password, this.value);
  }
}
