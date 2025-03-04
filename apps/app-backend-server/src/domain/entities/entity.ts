import type { ClassFields } from '@trastocker/typescript-utility-helper';

export class Entity<T> {
  public readonly id!: T;

  protected constructor(props: ClassFields<Entity<T>>) {
    Object.assign(this, props);
  }
}
