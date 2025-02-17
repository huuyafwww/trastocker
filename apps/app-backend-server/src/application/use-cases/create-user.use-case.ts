import { injectable, inject } from 'inversify';

import { INJECT_KEYS } from '@constants/inject-key';
import { CanCreateUserService } from '@domain/services/can-create-user.service';
import { CreateUserService } from '@domain/services/create-user.service';

import type { User } from '@domain/entities/user.entity';

export type CreateUserUseCaseProps = {
  name: string;
  email: string;
  password: string;
};

export type CreateUserUseCaseOutput = Promise<User>;

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject(INJECT_KEYS.CanCreateUserService) private canCreateUserService: CanCreateUserService,
    @inject(INJECT_KEYS.CreateUserService) private createUserService: CreateUserService,
  ) {}

  async execute(props: CreateUserUseCaseProps): CreateUserUseCaseOutput {
    const canCreate = await this.canCreateUserService.execute({
      email: props.email,
    });

    if (!canCreate) throw new Error('User already exists');

    return await this.createUserService.execute({
      name: props.name,
      email: props.email,
      password: props.password,
    });
  }
}
