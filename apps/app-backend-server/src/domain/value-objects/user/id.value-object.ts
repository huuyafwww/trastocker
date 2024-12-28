import { v4 as uuidv4 } from 'uuid';
import * as v from 'valibot';

import { ValueObject } from '../core/value-object';

export class InvalidUserIdError extends Error {
  public constructor(message = 'Invalid UserId') {
    super(message);
    this.name = 'InvalidUserIdError';
  }
}

export class UserId extends ValueObject<string> {
  private static readonly schema = v.pipe(
    v.string(),
    v.uuid(),
  );

  protected constructor(value: string) {
    super(value);
  }

  public static generate(): UserId {
    return new UserId(uuidv4());
  }

  public static fromString(value: string): UserId {
    if (!UserId.isValid(value)) {
      throw new InvalidUserIdError();
    }
    return new UserId(value);
  }

  public static isValid(value: string): boolean {
    return v.safeParse(UserId.schema, value).success;
  }

  public isEqual(id: UserId): boolean {
    return this.value === id.value;
  }
}
