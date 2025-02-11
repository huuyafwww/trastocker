import { injectable, inject } from 'inversify';

import { systemEmail } from '@constants/system-email';
import { systemEmailSubject } from '@constants/system-email-subject';
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
    @inject(UserRepository) private userRepository: UserRepository,
    @inject('EmailNotification') private emailNotification: EmailNotification,
  ) {
  }

  async execute(props: CreateUserServiceProps): Promise<CreateUserServiceOutput> {
    // TODO: exists user validation

    const user = User.create({
      name: UserName.fromString(props.name),
      email: UserEmail.fromString(props.email),
      password: UserPassword.fromRawString(props.password),
      verifiedAt: null,
    });

    const result = await this.emailNotification.dispatch(TextEmail.create({
      from: EmailFrom.fromString(systemEmail.register),
      to: user.email,
      subject: EmailSubject.fromString(systemEmailSubject.register),
      text: `Hello, ${user.name.toString()}!`,
    }));
    if (result.isErr()) {
      throw result.error;
    }

    return await this.userRepository.save(user);
  }
}
