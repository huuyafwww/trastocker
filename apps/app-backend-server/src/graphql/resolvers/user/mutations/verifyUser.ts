import { UserVerifyTokenSchema } from '@trastocker/validation-schema-definition';

import { INJECT_KEY } from '@constants/inject-key';
import { User } from '@domain/entities/user.entity';
import { builder } from '@graphql/builder';

import type { VerifyUserService } from '@domain/services/verify-user.service';

builder.mutationField('verifyUser', t => t.field({
  type: User,
  nullable: true,
  description: 'verify user',
  args: {
    verifyToken: t.arg.string({
      description: 'verify token',
      validate: { schema: UserVerifyTokenSchema },
    }),
  },
  resolve: async (_, args, context) => {
    return await context.container.get<VerifyUserService>(INJECT_KEY.VerifyUserService).execute(args);
  },
}));
