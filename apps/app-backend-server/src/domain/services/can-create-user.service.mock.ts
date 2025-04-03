import { injectable } from 'inversify';

import { Service } from '@domain/services/service';

type CanCreateUserServiceProps = {
  email: string;
};

export type CanCreateUserServiceOutput = boolean;

@injectable()
export class CanCreateUserService implements Service<CanCreateUserServiceProps, CanCreateUserServiceOutput> {
  async execute(): Promise<CanCreateUserServiceOutput> {
    return new Promise(resolve => resolve(true));
  }
}
