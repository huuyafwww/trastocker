import { injectable, inject } from 'inversify';

import { INJECT_KEYS } from '@constants/inject-key';
import { SYSTEM_EMAIL } from '@constants/system-email';
import { SYSTEM_EMAIL_SUBJECT } from '@constants/system-email-subject';
import { TextEmail } from '@domain/entities/text-email.entity';
import { User } from '@domain/entities/user.entity';
import { EmailNotification } from '@domain/notifications/email.notification';
import { UserRepository } from '@domain/repositories/user.repository';
import { Service } from '@domain/services/service';
import { EmailFrom } from '@domain/value-objects/email/from.value-object';
import { EmailSubject } from '@domain/value-objects/email/subject.value-object';
import { UserEmail } from '@domain/value-objects/user/email.value-object';
import { UserName } from '@domain/value-objects/user/name.value-object';
import { UserPassword } from '@domain/value-objects/user/password.value-object';

export type CreateUserServiceProps = {
  name: string;
  email: string;
  password: string;
};

export type CreateUserServiceOutput = User;

@injectable()
export class CreateUserService implements Service<CreateUserServiceProps, CreateUserServiceOutput> {
  constructor(
    @inject(INJECT_KEYS.UserRepository) private userRepository: UserRepository,
    @inject(INJECT_KEYS.EmailNotification) private emailNotification: EmailNotification,
  ) {
  }

  async execute(props: CreateUserServiceProps): Promise<CreateUserServiceOutput> {
    const user = await this.userRepository.save(User.create({
      name: UserName.fromString(props.name),
      email: UserEmail.fromString(props.email),
      password: UserPassword.fromRawString(props.password, { rounds: 1 }),
      verifiedAt: null,
    }));

    const result = await this.emailNotification.dispatch(TextEmail.create({
      from: EmailFrom.fromString(SYSTEM_EMAIL.register),
      to: user.email,
      subject: EmailSubject.fromString(SYSTEM_EMAIL_SUBJECT.register),
      text: `Hello, ${user.name.toString()}!`,
    }));
    if (result.isErr()) {
      throw result.error;
    }

    return user;
  }
}
