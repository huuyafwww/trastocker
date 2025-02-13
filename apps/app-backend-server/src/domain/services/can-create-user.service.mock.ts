import { injectable } from 'inversify';

import { Service } from '@domain/services/service';

export type CanCreateUserServiceOutput = boolean;

@injectable()
export class CanCreateUserService implements Service<{}, CanCreateUserServiceOutput> {
  async execute(): Promise<CanCreateUserServiceOutput> {
    return new Promise(resolve => resolve(true));
  }
}
