import type { WorkspaceUsers } from '@domain/collections/workspace-user.collection';
import type { WorkspaceUser } from '@domain/entities/workspace-user.entity';
import type { UserId } from '@domain/value-objects/user/id.value-object';
import type { WorkspaceId } from '@domain/value-objects/workspace/id.value-object';
import type { WorkspaceUserId } from '@domain/value-objects/workspace-user/id.value-object';

export abstract class WorkspaceUserRepository {
  abstract save(user: WorkspaceUser): Promise<WorkspaceUser>;
  abstract findById(id: WorkspaceUserId): Promise<WorkspaceUser | null>;
  abstract findByUserId(userId: UserId): Promise<WorkspaceUsers>;
  abstract findByWorkspaceId(workspaceId: WorkspaceId): Promise<WorkspaceUsers>;
}
