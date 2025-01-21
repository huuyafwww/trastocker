import type { FieldType } from '.';

export const name = (t: FieldType) => t.string({
  description: 'User Name',
  resolve: parent => parent.name,
});
