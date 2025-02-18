import * as v from 'valibot';

import { ValueObject } from '../core/value-object';

import type { SYSTEM_EMAIL_SUBJECT } from '@constants/system-email-subject';
import type { ValueOf } from 'type-fest';

export class InvalidEmailSubjectError extends Error {
  public constructor(message = 'Invalid EmailSubject') {
    super(message);
    this.name = 'InvalidEmailSubjectError';
  }
}

export class EmailSubject extends ValueObject<string> {
  declare readonly __brand: 'EmailSubject';
  private static readonly schema = v.pipe(
    v.string(),
    v.check(value => value.length >= 5),
  );

  protected constructor(value: string) {
    super(value);
  }

  public static fromString(value: ValueOf<typeof SYSTEM_EMAIL_SUBJECT>): EmailSubject {
    if (!EmailSubject.isValid(value)) {
      throw new InvalidEmailSubjectError();
    }
    return new EmailSubject(value);
  }

  public static isValid(value: string): boolean {
    return v.safeParse(EmailSubject.schema, value).success;
  }
}
