export abstract class ValueObject<T> {
  abstract readonly __brand: string;
  protected readonly value!: T;

  public constructor(value: T) {
    this.value = value;
  }

  public toString(): string {
    return String(this.value);
  }
}
