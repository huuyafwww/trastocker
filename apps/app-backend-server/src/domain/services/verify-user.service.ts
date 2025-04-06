import dedent from 'dedent';
import { injectable, inject } from 'inversify';

import { INJECT_KEY } from '@constants/inject-key';
import { SYSTEM_EMAIL } from '@constants/system-email';
import { SYSTEM_EMAIL_SUBJECT } from '@constants/system-email-subject';
import { TextEmail } from '@domain/entities/text-email.entity';
import { User } from '@domain/entities/user.entity';
import { EmailNotification } from '@domain/notifications/email.notification';
import { UserRepository } from '@domain/repositories/user.repository';
import { Service } from '@domain/services/service';
import { EmailFrom } from '@domain/value-objects/email/from.value-object';
import { EmailSubject } from '@domain/value-objects/email/subject.value-object';
import { UserVerifyToken } from '@domain/value-objects/user/verify-token.value-object';

export type VerifyUserServiceProps = {
  verifyToken: string;
};

export type VerifyUserServiceOutput = User;

@injectable()
export class VerifyUserService implements Service<VerifyUserServiceProps, VerifyUserServiceOutput> {
  constructor(
    @inject(INJECT_KEY.UserRepository) private userRepository: UserRepository,
    @inject(INJECT_KEY.EmailNotification) private emailNotification: EmailNotification,
  ) {
  }

  async execute(props: VerifyUserServiceProps): Promise<VerifyUserServiceOutput> {
    const user = await this.userRepository.findByVerifyToken(
      UserVerifyToken.fromString(props.verifyToken),
    );

    if (!user) {
      throw new Error('User not found');
    }

    if (user.canVerify()) {
      throw new Error('User already verified');
    }
    user.update({
      verifiedAt: new Date(),
    });

    const result = await this.emailNotification.dispatch(TextEmail.create({
      from: EmailFrom.fromString(SYSTEM_EMAIL.register),
      to: user.email,
      subject: EmailSubject.fromString(SYSTEM_EMAIL_SUBJECT.register),
      /* TODO: Support
        - html mail
        - email templates
        - i18n
      */
      text: dedent`
        Hello ${user.name},

        Your account has been verified successfully.

        Thank you for using our service.

        Best regards,
        Trastocker Team
      `,
    }));

    if (result.isErr()) {
      throw result.error;
    }

    return await this.userRepository.save(user);
  }
}
