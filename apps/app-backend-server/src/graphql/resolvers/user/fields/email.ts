import type { FieldType } from '.';

export const email = (t: FieldType) => t.string({
  description: 'User Email',
  resolve: parent => parent.email.toString(),
});
