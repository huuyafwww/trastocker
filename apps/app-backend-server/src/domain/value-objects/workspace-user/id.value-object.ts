import { idSchema } from '@trastocker/validation-schema-definition';
import { v4 as uuidv4 } from 'uuid';
import * as v from 'valibot';

import { ValueObject } from '../core/value-object';

export class InvalidWorkspaceUserIdError extends Error {
  public constructor(message = 'Invalid WorkspaceUserId') {
    super(message);
    this.name = 'InvalidWorkspaceUserIdError';
  }
}

export class WorkspaceUserId extends ValueObject<string> {
  private static readonly schema = idSchema;

  protected constructor(value: string) {
    super(value);
  }

  public static generate(): WorkspaceUserId {
    return new WorkspaceUserId(uuidv4());
  }

  public static fromString(value: string): WorkspaceUserId {
    if (!WorkspaceUserId.isValid(value)) {
      throw new InvalidWorkspaceUserIdError();
    }
    return new WorkspaceUserId(value);
  }

  public static isValid(value: string): boolean {
    return v.safeParse(WorkspaceUserId.schema, value).success;
  }

  public isEqual(id: WorkspaceUserId): boolean {
    return this.value === id.value;
  }
}
