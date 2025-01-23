import { createWorkspace } from './createWorkspace';
import { joinWorkspace } from './joinWorkspace';
import { loginUser } from './loginUser';

import type { CreateHandler } from '../';

export const createMutationHandlers: CreateHandler[] = [
  loginUser,
  createWorkspace,
  joinWorkspace,
];
