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
  public readonly name!: WorkspaceName;
  public readonly inviteCode!: WorkspaceInviteCode;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt: Date | null = null;

  public constructor(props: Fields<Workspace>) {
    super();
    Object.assign(this, props);
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
