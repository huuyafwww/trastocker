import { idSchema } from '@trastocker/validation-schema-definition';
import { v4 as uuidv4 } from 'uuid';
import * as v from 'valibot';

import { ValueObject } from '../core/value-object';

export class InvalidWorkspaceIdError extends Error {
  public constructor(message = 'Invalid WorkspaceId') {
    super(message);
    this.name = 'InvalidWorkspaceIdError';
  }
}

export class WorkspaceId extends ValueObject<string> {
  private static readonly schema = idSchema;

  protected constructor(value: string) {
    super(value);
  }

  public static generate(): WorkspaceId {
    return new WorkspaceId(uuidv4());
  }

  public static fromString(value: string): WorkspaceId {
    if (!WorkspaceId.isValid(value)) {
      throw new InvalidWorkspaceIdError();
    }
    return new WorkspaceId(value);
  }

  public static isValid(value: string): boolean {
    return v.safeParse(WorkspaceId.schema, value).success;
  }

  public isEqual(id: WorkspaceId): boolean {
    return this.value === id.value;
  }
}
