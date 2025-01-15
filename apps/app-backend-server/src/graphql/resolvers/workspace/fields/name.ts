import type { FieldType } from '.';

export const name = (t: FieldType) => t.string({
  description: 'Workspace Name',
  resolve: parent => parent.name.toString(),
});
