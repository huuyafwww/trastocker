import { injectable } from 'inversify';

import { UserToken } from '@domain/entities/user-token.entity';
import { UserTokenRepository } from '@domain/repositories/user-token.repository';
import { UserTokenId } from '@domain/value-objects/user-token/id.value-object';
import { Repository } from '@infrastructure/repositories/d1/repository';
import { mockedUserToken } from '@test/fixtures/user-token.fixture';

@injectable()
export class D1UserTokenRepository extends Repository<UserToken, UserTokenId> implements UserTokenRepository {
  async save(): Promise<UserToken> {
    return new Promise(resolve => resolve(mockedUserToken));
  }

  async findById(): Promise<UserToken | null> {
    return new Promise(resolve => resolve(mockedUserToken));
  }

  async findByUserId(): Promise<UserToken | null> {
    return new Promise(resolve => resolve(mockedUserToken));
  }

  async findByAccessToken(): Promise<UserToken | null> {
    return new Promise(resolve => resolve(mockedUserToken));
  }

  async findByRefreshToken(): Promise<UserToken | null> {
    return new Promise(resolve => resolve(mockedUserToken));
  }
}
