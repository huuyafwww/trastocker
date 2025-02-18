import { Entity } from '@domain/entities/entity';
import { EmailId } from '@domain/value-objects/email/id.value-object';

import type { Fields } from '@domain/entities/entity';
import type { EmailFrom } from '@domain/value-objects/email/from.value-object';
import type { EmailSubject } from '@domain/value-objects/email/subject.value-object';
import type { UserEmail } from '@domain/value-objects/user/email.value-object';

export type SerializeHtmldEmail = {
  id: string;
  from: string;
  to: string;
  subject: string;
  html: string;
};

export class HtmlEmail extends Entity<EmailId> {
  declare public readonly from: EmailFrom;
  declare public readonly to: UserEmail;
  declare public readonly subject: EmailSubject;
  declare public readonly html: string;

  private constructor(props: Fields<HtmlEmail>) {
    super(props);
  }

  public static create(props: Omit<Fields<HtmlEmail>, 'id'>): HtmlEmail {
    return new HtmlEmail({
      id: EmailId.generate(),
      ...props,
    });
  }

  public serialize(): SerializeHtmldEmail {
    return {
      id: this.id.toString(),
      from: this.from.toString(),
      to: this.to.toString(),
      subject: this.subject.toString(),
      html: this.html,
    };
  }
}
