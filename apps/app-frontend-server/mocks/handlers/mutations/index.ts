import { createWorkspace } from './createWorkspace';
import { joinWorkspace } from './joinWorkspace';
import { loginUser } from './loginUser';
import { registerUser } from './registerUser';

import type { CreateHandler } from '../';

export const createMutationHandlers: CreateHandler[] = [
  loginUser,
  registerUser,
  createWorkspace,
  joinWorkspace,
];
