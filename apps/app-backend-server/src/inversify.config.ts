import 'reflect-metadata';
import { connectDatabase } from '@trastocker/drizzle-helper/d1';
import { Container } from 'inversify';
import { Resend } from 'resend';

import { CreateUserUseCase } from '@application/use-cases/create-user.use-case';
import { GetAuthUserUseCase } from '@application/use-cases/get-auth-user.use-case';
import { UserLoginUseCase } from '@application/use-cases/user-login.use-case';
import { INJECT_KEY } from '@constants/inject-key';
import { AssignWorkspaceByIdService } from '@domain/services/assign-workspace-by-id.service';
import { AssignWorkspaceByInviteCodeService } from '@domain/services/assign-workspace-by-invite-code.service';
import { CanCreateUserService } from '@domain/services/can-create-user.service';
import { CreateUserService } from '@domain/services/create-user.service';
import { CreateWorkspaceByNameService } from '@domain/services/create-workspace-by-name.service';
import { GetUserJoinedWorkspacesService } from '@domain/services/get-user-joined-workspaces.service';
import { GetWorkspaceJoinedUsersService } from '@domain/services/get-workspace-joined-users.service';
import { VerifyUserService } from '@domain/services/verify-user.service';
import { ResendEmailNotification } from '@infrastructure/notifications/resend/email.notification';
import { D1UserTokenRepository } from '@infrastructure/repositories/d1/user-token.repository';
import { D1UserRepository } from '@infrastructure/repositories/d1/user.repository';
import { D1WorkspaceUserRepository } from '@infrastructure/repositories/d1/workspace-user.repository';
import { D1WorkspaceRepository } from '@infrastructure/repositories/d1/workspace.repository';

import type { EmailNotification } from '@domain/notifications/email.notification';
import type { UserTokenRepository } from '@domain/repositories/user-token.repository';
import type { UserRepository } from '@domain/repositories/user.repository';
import type { WorkspaceUserRepository } from '@domain/repositories/workspace-user.repository';
import type { WorkspaceRepository } from '@domain/repositories/workspace.repository';
import type { Database } from '@trastocker/drizzle-helper/d1';
import type { AnyD1Database } from 'drizzle-orm/d1';

const createContainer: (props: {
  database: AnyD1Database;
}) => Container = ({ database }) => {
  const container = new Container();
  container.bind<UserLoginUseCase>(INJECT_KEY.UserLoginUseCase).to(UserLoginUseCase);
  container.bind<GetAuthUserUseCase>(INJECT_KEY.GetAuthUserUseCase).to(GetAuthUserUseCase);
  container.bind<CreateUserUseCase>(INJECT_KEY.CreateUserUseCase).to(CreateUserUseCase);
  container.bind<CreateWorkspaceByNameService>(INJECT_KEY.CreateWorkspaceByNameService).to(CreateWorkspaceByNameService);
  container.bind<AssignWorkspaceByInviteCodeService>(INJECT_KEY.AssignWorkspaceByInviteCodeService).to(AssignWorkspaceByInviteCodeService);
  container.bind<AssignWorkspaceByIdService>(INJECT_KEY.AssignWorkspaceByIdService).to(AssignWorkspaceByIdService);
  container.bind<CanCreateUserService>(INJECT_KEY.CanCreateUserService).to(CanCreateUserService);
  container.bind<CreateUserService>(INJECT_KEY.CreateUserService).to(CreateUserService);
  container.bind<GetUserJoinedWorkspacesService>(INJECT_KEY.GetUserJoinedWorkspacesService).to(GetUserJoinedWorkspacesService);
  container.bind<GetWorkspaceJoinedUsersService>(INJECT_KEY.GetWorkspaceJoinedUsersService).to(GetWorkspaceJoinedUsersService);
  container.bind<VerifyUserService>(INJECT_KEY.VerifyUserService).to(VerifyUserService);
  container.bind<UserRepository>(INJECT_KEY.UserRepository).to(D1UserRepository);
  container.bind<UserTokenRepository>(INJECT_KEY.UserTokenRepository).to(D1UserTokenRepository);
  container.bind<WorkspaceRepository>(INJECT_KEY.WorkspaceRepository).to(D1WorkspaceRepository);
  container.bind<WorkspaceUserRepository>(INJECT_KEY.WorkspaceUserRepository).to(D1WorkspaceUserRepository);
  container.bind<EmailNotification>(INJECT_KEY.EmailNotification).to(ResendEmailNotification);
  container.bind<Database>(INJECT_KEY.D1Database).toConstantValue(connectDatabase(database));
  container.bind<Resend>(INJECT_KEY.Resend).toConstantValue(new Resend(process.env.RESEND_API_KEY));
  return container;
};

export { createContainer };
