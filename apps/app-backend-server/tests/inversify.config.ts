import 'reflect-metadata';
import { connectDatabase } from '@trastocker/database-definition';
import { Container } from 'inversify';

import { UserTokenRepository } from '@domain/repositories/user-token.repository';
import { UserRepository } from '@domain/repositories/user.repository';
import { D1UserTokenRepository } from '@infrastructure/repositories/d1/user-token.repository.mock';
import { D1UserRepository } from '@infrastructure/repositories/d1/user.repository.mock';

import type { AnyD1Database } from 'drizzle-orm/d1';

const createContainer: (props?: {
  database?: AnyD1Database;
}) => Container = (props) => {
  const container = new Container();
  container.bind<UserRepository>(UserRepository).to(D1UserRepository);
  container.bind<UserTokenRepository>(UserTokenRepository).to(D1UserTokenRepository);
  if (props?.database) {
    container.bind('D1Database').toConstantValue(connectDatabase(props.database));
  }
  return container;
};

export { createContainer };
