export type Fields<T> = Pick<T, {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [P in keyof T]: T[P] extends (...args: any[]) => any ? never : P;
}[keyof T]>;

export class Entity<T> {
  public readonly id!: T;

  protected constructor(props: Fields<Entity<T>>) {
    Object.assign(this, props);
  }
}
