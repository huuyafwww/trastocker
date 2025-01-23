import { authUser } from './authUser';
import { user } from './user';
import { workspace } from './workspace';

import type { CreateHandler } from '../';

export const createQueryHandlers: CreateHandler[] = [
  user,
  authUser,
  workspace,
];
