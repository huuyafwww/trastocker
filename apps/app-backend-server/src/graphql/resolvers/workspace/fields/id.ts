import type { FieldType } from '.';

export const id = (t: FieldType) => t.id({
  description: 'Workspace ID',
  resolve: parent => parent.id.toString(),
});
