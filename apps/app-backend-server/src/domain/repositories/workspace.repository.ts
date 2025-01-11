import type { Workspace } from '@domain/entities/workspace.entity';
import type { WorkspaceId } from '@domain/value-objects/workspace/id.value-object';
import type { WorkspaceInviteCode } from '@domain/value-objects/workspace/invite-code.value-object';

export abstract class WorkspaceRepository {
  abstract save(user: Workspace): Promise<Workspace>;
  abstract findById(id: WorkspaceId): Promise<Workspace | null>;
  abstract findByInviteCode(inviteCode: WorkspaceInviteCode): Promise<Workspace | null>;
}
