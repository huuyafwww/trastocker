import { builder } from '@graphql/builder';

import './resolvers/user';
import './resolvers/workspace';

export const schema = builder.toSchema();
