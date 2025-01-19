import 'reflect-metadata';
import { connectDatabase } from '@trastocker/database-definition';
import { Container } from 'inversify';

import { GetAuthUserUseCase } from '@application/use-cases/get-auth-user.use-case.mock';
import { UserTokenRepository } from '@domain/repositories/user-token.repository';
import { UserRepository } from '@domain/repositories/user.repository';
import { WorkspaceUserRepository } from '@domain/repositories/workspace-user.repository';
import { WorkspaceRepository } from '@domain/repositories/workspace.repository';
import { AssignWorkspaceByIdService } from '@domain/services/assign-workspace-by-id.service.mock';
import { AssignWorkspaceByInviteCodeService } from '@domain/services/assign-workspace-by-invite-code.service.mock';
import { CreateWorkspaceByNameService } from '@domain/services/create-workspace-by-name.service.mock';
import { GetUserJoinedWorkspacesService } from '@domain/services/get-user-joined-workspaces.service.mock';
import { GetWorkspaceJoinedUsersService } from '@domain/services/get-workspace-joined-users.service.mock';
import { D1UserTokenRepository } from '@infrastructure/repositories/d1/user-token.repository.mock';
import { D1UserRepository } from '@infrastructure/repositories/d1/user.repository.mock';
import { D1WorkspaceUserRepository } from '@infrastructure/repositories/d1/workspace-user.repository.mock';
import { D1WorkspaceRepository } from '@infrastructure/repositories/d1/workspace.repository.mock';

import type { AnyD1Database } from 'drizzle-orm/d1';

const createContainer: (props?: {
  database?: AnyD1Database;
}) => Container = (props) => {
  const container = new Container();
  container.bind(GetAuthUserUseCase).toSelf();
  container.bind<AssignWorkspaceByInviteCodeService>(AssignWorkspaceByInviteCodeService).toSelf();
  container.bind<CreateWorkspaceByNameService>(CreateWorkspaceByNameService).toSelf();
  container.bind<AssignWorkspaceByIdService>(AssignWorkspaceByIdService).toSelf();
  container.bind<GetUserJoinedWorkspacesService>(GetUserJoinedWorkspacesService).toSelf();
  container.bind<GetWorkspaceJoinedUsersService>(GetWorkspaceJoinedUsersService).toSelf();
  container.bind<UserRepository>(UserRepository).to(D1UserRepository);
  container.bind<UserTokenRepository>(UserTokenRepository).to(D1UserTokenRepository);
  container.bind<WorkspaceRepository>(WorkspaceRepository).to(D1WorkspaceRepository);
  container.bind<WorkspaceUserRepository>(WorkspaceUserRepository).to(D1WorkspaceUserRepository);
  if (props?.database) {
    container.bind('D1Database').toConstantValue(connectDatabase(props.database));
  }
  return container;
};

export { createContainer };
