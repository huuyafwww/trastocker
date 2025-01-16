import type { FieldType } from '.';

export const isDeleted = (t: FieldType) => t.boolean({
  description: 'User isDeleted',
  resolve: parent => parent.isDeleted(),
});
