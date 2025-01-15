import type { FieldType } from '.';

export const inviteCode = (t: FieldType) => t.string({
  description: 'Workspace Invite Code',
  resolve: parent => parent.inviteCode.toString(),
});
