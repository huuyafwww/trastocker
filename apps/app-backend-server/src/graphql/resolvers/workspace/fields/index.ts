import { Workspace } from '@domain/entities/workspace.entity';
import { builder } from '@graphql/builder';

import { id } from './id';
import { inviteCode } from './inviteCode';
import { name } from './name';

import type { SchemaBuilderType } from '@graphql/builder';

export type FieldType = PothosSchemaTypes.ObjectFieldBuilder<
  PothosSchemaTypes.ExtendDefaultTypes<SchemaBuilderType>,
  Workspace
>;

builder.objectType(Workspace, {
  name: 'Workspace',
  description: 'Workspace',
  fields: t => ({
    id: id(t),
    name: name(t),
    inviteCode: inviteCode(t),
  }),
});
