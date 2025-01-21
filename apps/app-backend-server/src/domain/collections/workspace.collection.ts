import { Collection } from '@domain/collections/collection';

import type { Workspace } from '@domain/entities/workspace.entity';
import type { WorkspaceId } from '@domain/value-objects/workspace/id.value-object';

export class Workspaces extends Collection<Workspace, WorkspaceId> {
  private constructor(entities: Workspace[]) {
    super(entities);
  }

  public static from(entities: Workspace[]): Workspaces {
    return new Workspaces(entities);
  }

  public filterActive(): Workspaces {
    return Workspaces.from(this.entities.filter(entity => !entity.isDeleted()));
  }
}
