import type { Result } from 'neverthrow';

export abstract class Notification<Entity> {
  abstract dispatch(entity: Entity): Promise<Result<boolean, Error>>;
}
