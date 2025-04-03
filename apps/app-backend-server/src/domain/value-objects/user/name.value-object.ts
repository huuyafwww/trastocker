import { UserNameSchema } from '@trastocker/validation-schema-definition';
import * as v from 'valibot';

import { ValueObject } from '../core/value-object';

export class InvalidUserNameError extends Error {
  public constructor(message = 'Invalid UserName') {
    super(message);
    this.name = 'InvalidUserNameError';
  }
}

export class UserName extends ValueObject<string> {
  declare readonly __brand: 'UserName';
  private static readonly schema = UserNameSchema;

  protected constructor(value: string) {
    super(value);
  }

  public static fromString(value: string): UserName {
    if (!UserName.isValid(value)) {
      throw new InvalidUserNameError();
    }
    return new this(value);
  }

  public static isValid(value: string): boolean {
    return v.safeParse(UserName.schema, value).success;
  }

  public isEqual(email: UserName): boolean {
    return this.value === email.value;
  }
}
