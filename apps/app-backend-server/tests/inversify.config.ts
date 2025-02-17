import 'reflect-metadata';
import { connectDatabase } from '@trastocker/database-definition';
import { Container } from 'inversify';

import { CreateUserUseCase } from '@application/use-cases/create-user.use-case.mock';
import { GetAuthUserUseCase } from '@application/use-cases/get-auth-user.use-case.mock';
import { UserLoginUseCase } from '@application/use-cases/user-login.use-case.mock';
import { INJECT_KEYS } from '@constants/inject-key';
import { AssignWorkspaceByIdService } from '@domain/services/assign-workspace-by-id.service.mock';
import { AssignWorkspaceByInviteCodeService } from '@domain/services/assign-workspace-by-invite-code.service.mock';
import { CanCreateUserService } from '@domain/services/can-create-user.service.mock';
import { CreateUserService } from '@domain/services/create-user.service.mock';
import { CreateWorkspaceByNameService } from '@domain/services/create-workspace-by-name.service.mock';
import { GetUserJoinedWorkspacesService } from '@domain/services/get-user-joined-workspaces.service.mock';
import { GetWorkspaceJoinedUsersService } from '@domain/services/get-workspace-joined-users.service.mock';
import { ResendEmailNotification } from '@infrastructure/notifications/resend/email.notification.mock';
import { D1UserTokenRepository } from '@infrastructure/repositories/d1/user-token.repository.mock';
import { D1UserRepository } from '@infrastructure/repositories/d1/user.repository.mock';
import { D1WorkspaceUserRepository } from '@infrastructure/repositories/d1/workspace-user.repository.mock';
import { D1WorkspaceRepository } from '@infrastructure/repositories/d1/workspace.repository.mock';

import { ResendClient } from './clients/resend';

import type { EmailNotification } from '@domain/notifications/email.notification';
import type { UserTokenRepository } from '@domain/repositories/user-token.repository';
import type { UserRepository } from '@domain/repositories/user.repository';
import type { WorkspaceUserRepository } from '@domain/repositories/workspace-user.repository';
import type { WorkspaceRepository } from '@domain/repositories/workspace.repository';
import type { Database } from '@trastocker/database-definition';
import type { AnyD1Database } from 'drizzle-orm/d1';
import type { Resend } from 'resend';

const createContainer: (props?: {
  database?: AnyD1Database;
}) => Container = (props) => {
  const container = new Container();
  container.bind<UserLoginUseCase>(INJECT_KEYS.UserLoginUseCase).to(UserLoginUseCase);
  container.bind<GetAuthUserUseCase>(INJECT_KEYS.GetAuthUserUseCase).to(GetAuthUserUseCase);
  container.bind<CreateUserUseCase>(INJECT_KEYS.CreateUserUseCase).to(CreateUserUseCase);
  container.bind<CreateWorkspaceByNameService>(INJECT_KEYS.CreateWorkspaceByNameService).to(CreateWorkspaceByNameService);
  container.bind<AssignWorkspaceByInviteCodeService>(INJECT_KEYS.AssignWorkspaceByInviteCodeService).to(AssignWorkspaceByInviteCodeService);
  container.bind<AssignWorkspaceByIdService>(INJECT_KEYS.AssignWorkspaceByIdService).to(AssignWorkspaceByIdService);
  container.bind<CanCreateUserService>(INJECT_KEYS.CanCreateUserService).to(CanCreateUserService);
  container.bind<CreateUserService>(INJECT_KEYS.CreateUserService).to(CreateUserService);
  container.bind<GetUserJoinedWorkspacesService>(INJECT_KEYS.GetUserJoinedWorkspacesService).to(GetUserJoinedWorkspacesService);
  container.bind<GetWorkspaceJoinedUsersService>(INJECT_KEYS.GetWorkspaceJoinedUsersService).to(GetWorkspaceJoinedUsersService);
  container.bind<UserRepository>(INJECT_KEYS.UserRepository).to(D1UserRepository);
  container.bind<UserTokenRepository>(INJECT_KEYS.UserTokenRepository).to(D1UserTokenRepository);
  container.bind<WorkspaceRepository>(INJECT_KEYS.WorkspaceRepository).to(D1WorkspaceRepository);
  container.bind<WorkspaceUserRepository>(INJECT_KEYS.WorkspaceUserRepository).to(D1WorkspaceUserRepository);
  container.bind<EmailNotification>(INJECT_KEYS.EmailNotification).to(ResendEmailNotification);
  if (props?.database) {
    container.bind<Database>(INJECT_KEYS.D1Database).toConstantValue(connectDatabase(props.database));
  }
  container.bind<Partial<Resend>>(INJECT_KEYS.Resend).toConstantValue(new ResendClient());
  return container;
};

export { createContainer };
