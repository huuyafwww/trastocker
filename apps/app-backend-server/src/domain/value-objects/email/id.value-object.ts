import { idSchema } from '@trastocker/validation-schema-definition';
import { v4 as uuidv4 } from 'uuid';
import * as v from 'valibot';

import { ValueObject } from '../core/value-object';

export class InvalidEmailIdError extends Error {
  public constructor(message = 'Invalid EmailId') {
    super(message);
    this.name = 'InvalidEmailIdError';
  }
}

export class EmailId extends ValueObject<string> {
  declare readonly __brand: 'EmailId';
  private static readonly schema = idSchema;

  protected constructor(value: string) {
    super(value);
  }

  public static generate(): EmailId {
    return new EmailId(uuidv4());
  }

  public static fromString(value: string): EmailId {
    if (!EmailId.isValid(value)) {
      throw new InvalidEmailIdError();
    }
    return new EmailId(value);
  }

  public static isValid(value: string): boolean {
    return v.safeParse(EmailId.schema, value).success;
  }

  public isEqual(id: EmailId): boolean {
    return this.value === id.value;
  }
}
