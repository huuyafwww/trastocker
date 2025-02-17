import { injectable, inject } from 'inversify';

import { INJECT_KEYS } from '@constants/inject-key';
import { UserRepository } from '@domain/repositories/user.repository';
import { Service } from '@domain/services/service';
import { UserEmail } from '@domain/value-objects/user/email.value-object';

export type CanCreateUserServiceProps = {
  email: string;
};

export type CanCreateUserServiceOutput = boolean;

@injectable()
export class CanCreateUserService implements Service<CanCreateUserServiceProps, CanCreateUserServiceOutput> {
  constructor(
    @inject(INJECT_KEYS.UserRepository) private userRepository: UserRepository,
  ) {}

  async execute(props: CanCreateUserServiceProps): Promise<CanCreateUserServiceOutput> {
    const user = await this.userRepository.findByEmail(UserEmail.fromString(props.email));
    return !user;
  }
}
