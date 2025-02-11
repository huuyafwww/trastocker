import * as v from 'valibot';

import { systemEmail } from '@constants/system-email';

import { ValueObject } from '../core/value-object';

import type { ValueOf } from 'type-fest';

export class InvalidEmailFromError extends Error {
  public constructor(message = 'Invalid EmailFrom') {
    super(message);
    this.name = 'InvalidEmailFromError';
  }
}

export class EmailFrom extends ValueObject<string> {
  declare readonly __brand: 'EmailFrom';
  private static readonly schema = v.pipe(
    v.string(),
    v.email(),
    v.check(value => Object.values(systemEmail).includes(value)),
  );

  protected constructor(value: string) {
    super(value);
  }

  public static fromString(value: ValueOf<typeof systemEmail>): EmailFrom {
    if (!EmailFrom.isValid(value)) {
      throw new InvalidEmailFromError();
    }
    return new EmailFrom(value);
  }

  public static isValid(value: string): boolean {
    return v.safeParse(EmailFrom.schema, value).success;
  }
}
