import { v4 as uuidv4 } from 'uuid';
import * as v from 'valibot';

import { ValueObject } from '../core/value-object';

export class InvalidUserTokenIdError extends Error {
  public constructor(message = 'Invalid UserTokenId') {
    super(message);
    this.name = 'InvalidUserTokenIdError';
  }
}

export class UserTokenId extends ValueObject<string> {
  declare readonly __brand: 'UserTokenId';
  private static readonly schema = v.pipe(
    v.string(),
    v.uuid(),
  );

  protected constructor(value: string) {
    super(value);
  }

  public static generate(): UserTokenId {
    return new UserTokenId(uuidv4());
  }

  public static fromString(value: string): UserTokenId {
    if (!UserTokenId.isValid(value)) {
      throw new InvalidUserTokenIdError();
    }
    return new UserTokenId(value);
  }

  public static isValid(value: string): boolean {
    return v.safeParse(UserTokenId.schema, value).success;
  }

  public isEqual(id: UserTokenId): boolean {
    return this.value === id.value;
  }
}
