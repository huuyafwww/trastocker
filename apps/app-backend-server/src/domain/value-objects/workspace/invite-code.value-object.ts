import { INVITE_CODE_LENGTH, WorkspaceInviteCodeSchema } from '@trastocker/validation-schema-definition';
import { customAlphabet } from 'nanoid';
import * as v from 'valibot';

import { ValueObject } from '../core/value-object';

const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', INVITE_CODE_LENGTH);

export class InvalidWorkspaceInviteCodeError extends Error {
  public constructor(message = 'Invalid WorkspaceInviteCode') {
    super(message);
    this.name = 'InvalidWorkspaceInviteCodeError';
  }
}

export class WorkspaceInviteCode extends ValueObject<string> {
  declare readonly __brand: 'WorkspaceInviteCode';
  private static readonly schema = WorkspaceInviteCodeSchema;

  protected constructor(value: string) {
    super(value);
  }

  public static generate(): WorkspaceInviteCode {
    return new WorkspaceInviteCode(nanoid());
  }

  public static fromString(value: string): WorkspaceInviteCode {
    if (!WorkspaceInviteCode.isValid(value)) {
      throw new InvalidWorkspaceInviteCodeError();
    }
    return new WorkspaceInviteCode(value);
  }

  public static isValid(value: string): boolean {
    return v.safeParse(WorkspaceInviteCode.schema, value).success;
  }

  public isEqual(id: WorkspaceInviteCode): boolean {
    return this.value === id.value;
  }
}
