import type { WorkspaceUser } from '@domain/entities/workspace-user.entity';
import type { UserId } from '@domain/value-objects/user/id.value-object';
import type { WorkspaceId } from '@domain/value-objects/workspace/id.value-object';

export class WorkspaceUsers {
  private constructor(private entities: WorkspaceUser[]) {}

  public static from(entities: WorkspaceUser[]): WorkspaceUsers {
    return new WorkspaceUsers(entities);
  }

  public filterActive(): WorkspaceUsers {
    return WorkspaceUsers.from(this.entities.filter(entity => !entity.isDeleted()));
  }

  public pickWorkspaceIds(): WorkspaceId[] {
    return this.entities.map(entity => entity.workspaceId);
  }

  public pickUserIds(): UserId[] {
    return this.entities.map(entity => entity.userId);
  }

  public toEntities(): WorkspaceUser[] {
    return this.entities;
  }
}
