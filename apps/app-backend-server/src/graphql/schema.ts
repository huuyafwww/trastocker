import { builder } from '@graphql/builder';

import './resolvers/user';

export const schema = builder.toSchema();
