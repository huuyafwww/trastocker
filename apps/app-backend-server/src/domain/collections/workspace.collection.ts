import type { Workspace } from '@domain/entities/workspace.entity';

export class Workspaces {
  private constructor(private entities: Workspace[]) {}

  public static from(entities: Workspace[]): Workspaces {
    return new Workspaces(entities);
  }

  public filterActive(): Workspaces {
    return Workspaces.from(this.entities.filter(entity => !entity.isDeleted()));
  }

  public toEntities(): Workspace[] {
    return this.entities;
  }
}
