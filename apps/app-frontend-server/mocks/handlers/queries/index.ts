import { authUser } from './authUser';
import { user } from './user';

import type { CreateHandler } from '../';

export const createQueryHandlers: CreateHandler[] = [
  user,
  authUser,
];
