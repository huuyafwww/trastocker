import { injectable } from 'inversify';
import { ok } from 'neverthrow';

import { Email } from '@domain/entities/email.entity';
import { EmailNotification } from '@domain/notifications/email.notification';
import { Notification } from '@infrastructure/notifications/notification';

import type { Result } from 'neverthrow';

@injectable()
export class ResendEmailNotification extends Notification<Email> implements EmailNotification {
  async dispatch(): Promise<Result<boolean, Error>> {
    return new Promise(resolve => resolve(ok(true)));
  }
}
