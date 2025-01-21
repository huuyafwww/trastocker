import * as v from 'valibot';

const WORKSPACE_NAME_MIN_LENGTH = 1;
const WORKSPACE_NAME_MAX_LENGTH = 50;

export const WorkspaceNameSchema = v.pipe(
  v.string(),
  v.check(value => value.length >= WORKSPACE_NAME_MIN_LENGTH, `Workspace name must be at least ${WORKSPACE_NAME_MIN_LENGTH} characters long`),
  v.check(value => value.length <= WORKSPACE_NAME_MAX_LENGTH, `Workspace name must be at most ${WORKSPACE_NAME_MAX_LENGTH} characters long`),
);
