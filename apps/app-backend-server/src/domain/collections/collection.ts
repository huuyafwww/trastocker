import type { Entity } from '../entities/entity';

export abstract class Collection<T extends Entity<Id>, Id> {
  protected constructor(protected entities: T[]) {
    Object.assign(this, entities);
  }

  public pickIds(): Id[] {
    return this.entities.map(entity => entity.id);
  }

  public toEntities(): T[] {
    return this.entities;
  }
}
