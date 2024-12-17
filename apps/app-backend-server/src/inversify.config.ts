import 'reflect-metadata';
import { connectDatabase } from '@trastocker/database-definition';
import { Container } from 'inversify';

import { GetAuthUserUseCase } from '@application/use-cases/get-auth-user.use-case';
import { UserLoginUseCase } from '@application/use-cases/user-login.use-case';
import { UserTokenRepository } from '@domain/repositories/user-token.repository';
import { UserRepository } from '@domain/repositories/user.repository';
import { D1UserTokenRepository } from '@infrastructure/repositories/d1/user-token.repository';
import { D1UserRepository } from '@infrastructure/repositories/d1/user.repository';

import type { AnyD1Database } from 'drizzle-orm/d1';

const createContainer: (props: {
  database: AnyD1Database;
}) => Container = ({ database }) => {
  const container = new Container();
  container.bind<UserLoginUseCase>(UserLoginUseCase).to(UserLoginUseCase);
  container.bind<GetAuthUserUseCase>(GetAuthUserUseCase).to(GetAuthUserUseCase);
  container.bind<UserRepository>(UserRepository).to(D1UserRepository);
  container.bind<UserTokenRepository>(UserTokenRepository).to(D1UserTokenRepository);
  container.bind('D1Database').toConstantValue(connectDatabase(database));
  return container;
};

export { createContainer };
