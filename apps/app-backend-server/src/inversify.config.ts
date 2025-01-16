import 'reflect-metadata';
import { connectDatabase } from '@trastocker/database-definition';
import { Container } from 'inversify';

import { GetAuthUserUseCase } from '@application/use-cases/get-auth-user.use-case';
import { UserLoginUseCase } from '@application/use-cases/user-login.use-case';
import { UserTokenRepository } from '@domain/repositories/user-token.repository';
import { UserRepository } from '@domain/repositories/user.repository';
import { WorkspaceUserRepository } from '@domain/repositories/workspace-user.repository';
import { WorkspaceRepository } from '@domain/repositories/workspace.repository';
import { CreateWorkspaceByNameService } from '@domain/services/create-workspace-by-name.service';
import { GetJoinedWorkspacesByUserIdService } from '@domain/services/get-joined-workspaces-by-user-id.service';
import { GetWorkspaceJoinedUsersService } from '@domain/services/get-workspace-joined-users.service';
import { D1UserTokenRepository } from '@infrastructure/repositories/d1/user-token.repository';
import { D1UserRepository } from '@infrastructure/repositories/d1/user.repository';
import { D1WorkspaceUserRepository } from '@infrastructure/repositories/d1/workspace-user.repository';
import { D1WorkspaceRepository } from '@infrastructure/repositories/d1/workspace.repository';

import type { AnyD1Database } from 'drizzle-orm/d1';

const createContainer: (props: {
  database: AnyD1Database;
}) => Container = ({ database }) => {
  const container = new Container();
  container.bind<UserLoginUseCase>(UserLoginUseCase).to(UserLoginUseCase);
  container.bind<GetAuthUserUseCase>(GetAuthUserUseCase).to(GetAuthUserUseCase);
  container.bind<CreateWorkspaceByNameService>(CreateWorkspaceByNameService).to(CreateWorkspaceByNameService);
  container.bind<GetJoinedWorkspacesByUserIdService>(GetJoinedWorkspacesByUserIdService).to(GetJoinedWorkspacesByUserIdService);
  container.bind<GetWorkspaceJoinedUsersService>(GetWorkspaceJoinedUsersService).to(GetWorkspaceJoinedUsersService);
  container.bind<UserRepository>(UserRepository).to(D1UserRepository);
  container.bind<UserTokenRepository>(UserTokenRepository).to(D1UserTokenRepository);
  container.bind<WorkspaceRepository>(WorkspaceRepository).to(D1WorkspaceRepository);
  container.bind<WorkspaceUserRepository>(WorkspaceUserRepository).to(D1WorkspaceUserRepository);
  container.bind('D1Database').toConstantValue(connectDatabase(database));
  return container;
};

export { createContainer };
