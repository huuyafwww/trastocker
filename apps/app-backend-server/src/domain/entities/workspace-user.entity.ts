import { Entity } from '@domain/entities/entity';
import { WorkspaceUserId } from '@domain/value-objects/workspace-user/id.value-object';

import type { Fields } from '@domain/entities/entity';
import type { UserId } from '@domain/value-objects/user/id.value-object';
import type { WorkspaceId } from '@domain/value-objects/workspace/id.value-object';

type SerializedWorkspaceUser = {
  id: string;
  userId: string;
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export class WorkspaceUser extends Entity<WorkspaceUserId> {
  declare public readonly userId: UserId;
  declare public readonly workspaceId: WorkspaceId;
  declare public readonly createdAt: Date;
  declare public readonly updatedAt: Date;
  declare public readonly deletedAt: Date | null;

  public constructor(props: Fields<WorkspaceUser>) {
    super(props);
  }

  public static create(props: Omit<Fields<WorkspaceUser>, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): WorkspaceUser {
    return new WorkspaceUser({
      id: WorkspaceUserId.generate(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      ...props,
    });
  }

  private update(props: Partial<Fields<WorkspaceUser>>): WorkspaceUser {
    return new WorkspaceUser({
      ...this,
      ...props,
      updatedAt: new Date(),
    });
  }

  public delete(): WorkspaceUser {
    return this.update({
      ...this,
      updatedAt: new Date(),
      deletedAt: new Date(),
    });
  }

  public serialize(): SerializedWorkspaceUser {
    return {
      id: this.id.toString(),
      userId: this.userId.toString(),
      workspaceId: this.workspaceId.toString(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
