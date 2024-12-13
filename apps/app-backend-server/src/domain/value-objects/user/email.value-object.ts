import * as v from 'valibot';

export class InvalidUserEmailError extends Error {
  public constructor(message = 'Invalid UserEmail') {
    super(message);
    this.name = 'InvalidUserEmailError';
  }
}

export class UserEmail {
  private readonly value: string;
  private static readonly schema = v.pipe(
    v.string(),
    v.email(),
  );

  protected constructor(value: string) {
    this.value = value;
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

  public toString(): string {
    return this.value;
  }

  public isEqual(email: UserEmail): boolean {
    return this.value === email.value;
  }
}
