import bcrypt from 'bcryptjs';
import * as v from 'valibot';

const PASSWORD_MIN_LENGTH = 12;

export class InvalidUserPasswordError extends Error {
  public constructor(message = 'Invalid UserPassword') {
    super(message);
    this.name = 'InvalidUserPasswordError';
  }
}

export class UserPassword {
  private readonly value: string;
  private static readonly schema = v.pipe(
    v.string(),
    v.check(value => value.length >= PASSWORD_MIN_LENGTH, 'Password must be at least 12 characters long'),
    v.check(value => /[a-z]/.test(value), 'Password must contain at least one lowercase letter'),
    v.check(value => /[A-Z]/.test(value), 'Password must contain at least one uppercase letter'),
    v.check(value => /[0-9]/.test(value), 'Password must contain at least one number'),
    v.check(value => /[!-/:-@[-`{-~]/.test(value), 'Password must contain at least one special character'),
  );

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
