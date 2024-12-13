import { v4 as uuidv4 } from 'uuid';
import * as v from 'valibot';

export class InvalidUserTokenIdError extends Error {
  public constructor(message = 'Invalid UserTokenId') {
    super(message);
    this.name = 'InvalidUserTokenIdError';
  }
}

export class UserTokenId {
  private readonly value: string;
  private static readonly schema = v.pipe(
    v.string(),
    v.uuid(),
  );

  protected constructor(value: string) {
    this.value = value;
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

  public toString(): string {
    return this.value;
  }

  public isEqual(id: UserTokenId): boolean {
    return this.value === id.value;
  }
}
