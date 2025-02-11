import type { Email } from '@domain/entities/email.entity';
import type { Result } from 'neverthrow';

export abstract class EmailNotification {
  abstract dispatch(email: Email): Promise<Result<boolean, Error>>;
}
