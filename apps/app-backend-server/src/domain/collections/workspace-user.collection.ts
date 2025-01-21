import { Collection } from '@domain/collections/collection';

import type { WorkspaceUser } from '@domain/entities/workspace-user.entity';
import type { UserId } from '@domain/value-objects/user/id.value-object';
import type { WorkspaceId } from '@domain/value-objects/workspace/id.value-object';
import type { WorkspaceUserId } from '@domain/value-objects/workspace-user/id.value-object';

export class WorkspaceUsers extends Collection<WorkspaceUser, WorkspaceUserId> {
  private constructor(entities: WorkspaceUser[]) {
    super(entities);
  }

  public static from(entities: WorkspaceUser[]): WorkspaceUsers {
    return new WorkspaceUsers(entities);
  }

  public filterActive(): WorkspaceUsers {
    return WorkspaceUsers.from(this.entities.filter(entity => !entity.isDeleted()));
  }

  public filterByUserId(userId: UserId): WorkspaceUsers {
    return WorkspaceUsers.from(this.entities.filter(entity => entity.userId.isEqual(userId)));
  }

  public filterByWorkspaceId(workspaceId: WorkspaceId): WorkspaceUsers {
    return WorkspaceUsers.from(this.entities.filter(entity => entity.workspaceId.isEqual(workspaceId)));
  }

  public pickWorkspaceIds(): WorkspaceId[] {
    return this.entities.map(entity => entity.workspaceId);
  }

  public pickUserIds(): UserId[] {
    return this.entities.map(entity => entity.userId);
  }
}
