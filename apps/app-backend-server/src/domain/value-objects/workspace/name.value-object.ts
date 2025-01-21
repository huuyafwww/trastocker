import { WorkspaceNameSchema } from '@trastocker/validation-schema-definition';
import * as v from 'valibot';

import { ValueObject } from '../core/value-object';

export class InvalidWorkspaceNameError extends Error {
  public constructor(message = 'Invalid WorkspaceName') {
    super(message);
    this.name = 'InvalidWorkspaceNameError';
  }
}

export class WorkspaceName extends ValueObject<string> {
  declare readonly __brand: 'WorkspaceName';
  private static readonly schema = WorkspaceNameSchema;

  protected constructor(value: string) {
    super(value);
  }

  public static fromString(value: string): WorkspaceName {
    if (!WorkspaceName.isValid(value)) {
      throw new InvalidWorkspaceNameError();
    }
    return new WorkspaceName(value);
  }

  public static isValid(value: string): boolean {
    return v.safeParse(WorkspaceName.schema, value).success;
  }

  public isEqual(id: WorkspaceName): boolean {
    return this.value === id.value;
  }
}
