import { Entity } from '@domain/entities/entity';
import { WorkspaceId } from '@domain/value-objects/workspace/id.value-object';

import type { Fields } from '@domain/entities/entity';
import type { WorkspaceInviteCode } from '@domain/value-objects/workspace/invite-code.value-object';
import type { WorkspaceName } from '@domain/value-objects/workspace/name.value-object';

type SerializedWorkspace = {
  id: string;
  name: string;
  inviteCode: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export class Workspace extends Entity<WorkspaceId> {
  declare public readonly name: WorkspaceName;
  declare public readonly inviteCode: WorkspaceInviteCode;
  declare public readonly createdAt: Date;
  declare public readonly updatedAt: Date;
  declare public readonly deletedAt: Date | null;

  public constructor(props: Fields<Workspace>) {
    super(props);
  }

  public static create(props: Omit<Fields<Workspace>, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Workspace {
    return new Workspace({
      id: WorkspaceId.generate(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      ...props,
    });
  }

  private update(props: Partial<Fields<Workspace>>): Workspace {
    return new Workspace({
      ...this,
      ...props,
      updatedAt: new Date(),
    });
  }

  public delete(): Workspace {
    return this.update({
      ...this,
      updatedAt: new Date(),
      deletedAt: new Date(),
    });
  }

  public isDeleted(): boolean {
    return this.deletedAt !== null;
  }

  public serialize(): SerializedWorkspace {
    return {
      id: this.id.toString(),
      name: this.name.toString(),
      inviteCode: this.inviteCode.toString(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
