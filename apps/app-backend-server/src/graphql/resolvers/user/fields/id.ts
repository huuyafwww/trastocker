import type { FieldType } from '.';

export const id = (t: FieldType) => t.id({
  description: 'User ID',
  resolve: parent => parent.id.toString(),
});
