import type { FieldType } from '.';

export const isDeleted = (t: FieldType) => t.boolean({
  description: 'Workspace isDeleted',
  resolve: parent => parent.isDeleted(),
});
