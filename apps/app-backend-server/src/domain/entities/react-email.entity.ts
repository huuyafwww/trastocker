import { Entity } from '@domain/entities/entity';
import { EmailId } from '@domain/value-objects/email/id.value-object';

import type { Fields } from '@domain/entities/entity';
import type { EmailFrom } from '@domain/value-objects/email/from.value-object';
import type { EmailSubject } from '@domain/value-objects/email/subject.value-object';
import type { UserEmail } from '@domain/value-objects/user/email.value-object';

export type SerializedReactEmail = {
  id: string;
  from: string;
  to: string;
  subject: string;
  react: React.ReactNode;
};

export class ReactEmail extends Entity<EmailId> {
  declare public readonly from: EmailFrom;
  declare public readonly to: UserEmail;
  declare public readonly subject: EmailSubject;
  declare public readonly react: React.ReactNode;

  private constructor(props: Fields<ReactEmail>) {
    super(props);
  }

  public static create(props: Omit<Fields<ReactEmail>, 'id'>): ReactEmail {
    return new ReactEmail({
      id: EmailId.generate(),
      ...props,
    });
  }

  public serialize(): SerializedReactEmail {
    return {
      id: this.id.toString(),
      from: this.from.toString(),
      to: this.to.toString(),
      subject: this.subject.toString(),
      react: this.react,
    };
  }
}
