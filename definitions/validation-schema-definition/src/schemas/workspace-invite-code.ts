import * as v from 'valibot';

export const INVITE_CODE_LENGTH = 8;

export const WorkspaceInviteCodeSchema = v.pipe(
  v.string(),
  v.length(INVITE_CODE_LENGTH),
);
