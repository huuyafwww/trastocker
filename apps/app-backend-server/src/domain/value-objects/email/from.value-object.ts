import * as v from 'valibot';

import { SYSTEM_EMAIL, SYSTEM_EMAIL_KEYS } from '@constants/system-email';

import { ValueObject } from '../core/value-object';

import type { SYSTEM_EMAIL_TYPE } from '@constants/system-email';
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
    v.check(value => SYSTEM_EMAIL_KEYS.map(key => SYSTEM_EMAIL[key]).includes(value)),
  );

  protected constructor(value: string) {
    super(value);
  }

  public static fromString(value: ValueOf<SYSTEM_EMAIL_TYPE>): EmailFrom {
    if (!EmailFrom.isValid(value)) {
      throw new InvalidEmailFromError();
    }
    return new EmailFrom(value);
  }

  public static isValid(value: string): boolean {
    return v.safeParse(EmailFrom.schema, value).success;
  }
}
