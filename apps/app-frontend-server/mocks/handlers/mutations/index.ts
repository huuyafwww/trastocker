import { loginUser } from './loginUser';

import type { CreateHandler } from '../';

export const createMutationHandlers: CreateHandler[] = [
  loginUser,
];
