import { User } from '@domain/entities/user.entity';
import { builder } from '@graphql/builder';

import { email } from './email';
import { id } from './id';
import { isDeleted } from './isDeleted';
import { name } from './name';
import { workspaces } from './workspaces';

import type { SchemaBuilderType } from '@graphql/builder';

export type FieldType = PothosSchemaTypes.ObjectFieldBuilder<
  PothosSchemaTypes.ExtendDefaultTypes<SchemaBuilderType>,
  User
>;

builder.objectType(User, {
  name: 'User',
  description: 'User',
  fields: t => ({
    id: id(t),
    name: name(t),
    email: email(t),
    isDeleted: isDeleted(t),
    workspaces: workspaces(t),
  }),
});
