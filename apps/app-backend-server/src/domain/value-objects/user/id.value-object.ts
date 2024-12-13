import { v4 as uuidv4 } from 'uuid';
import * as v from 'valibot';

export class InvalidUserIdError extends Error {
  public constructor(message = 'Invalid UserId') {
    super(message);
    this.name = 'InvalidUserIdError';
  }
}

export class UserId {
  private readonly value: string;
  private static readonly schema = v.pipe(
    v.string(),
    v.uuid(),
  );

  protected constructor(value: string) {
    this.value = value;
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

  public toString(): string {
    return this.value;
  }

  public isEqual(id: UserId): boolean {
    return this.value === id.value;
  }
}
