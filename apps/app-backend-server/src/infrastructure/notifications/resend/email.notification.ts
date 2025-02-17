import { injectable, inject } from 'inversify';
import { err, ok } from 'neverthrow';

import { INJECT_KEYS } from '@constants/inject-key';
import { Email } from '@domain/entities/email.entity';
import { EmailNotification } from '@domain/notifications/email.notification';
import { Notification } from '@infrastructure/notifications/notification';

import type { Result } from 'neverthrow';
import type { Resend } from 'resend';

@injectable()
export class ResendEmailNotification extends Notification<Email> implements EmailNotification {
  constructor(
    @inject(INJECT_KEYS.Resend) private resend: Resend,
  ) {
    super();
  }

  async dispatch(email: Email): Promise<Result<boolean, Error>> {
    const result = await this.resend.emails.send(email.serialize());
    if (result.error) {
      return err(result.error);
    }
    return ok(true);
  }
}
