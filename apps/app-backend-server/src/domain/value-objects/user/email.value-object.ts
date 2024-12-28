import { UserEmailSchema } from '@trastocker/validation-schema-definition';
import * as v from 'valibot';

import { ValueObject } from '../core/value-object';

export class InvalidUserEmailError extends Error {
  public constructor(message = 'Invalid UserEmail') {
    super(message);
    this.name = 'InvalidUserEmailError';
  }
}

export class UserEmail extends ValueObject<string> {
  private static readonly schema = UserEmailSchema;

  protected constructor(value: string) {
    super(value);
  }

  public static fromString(value: string): UserEmail {
    if (!UserEmail.isValid(value)) {
      throw new InvalidUserEmailError();
    }
    return new this(value);
  }

  public static isValid(value: string): boolean {
    return v.safeParse(UserEmail.schema, value).success;
  }

  public isEqual(email: UserEmail): boolean {
    return this.value === email.value;
  }
}
