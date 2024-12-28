export type Brand<K, T> = K & { __brand: T };

export class ValueObject<T> {
  protected readonly value!: T;

  public constructor(value: T) {
    this.value = value;
  }

  public toString(): string {
    return String(this.value);
  }
}
