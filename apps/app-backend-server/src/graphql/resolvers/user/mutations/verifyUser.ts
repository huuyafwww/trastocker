import { UserVerifyTokenSchema } from '@trastocker/validation-schema-definition';

import { User } from '@domain/entities/user.entity';
import { VerifyUserService } from '@domain/services/verify-user.service';
import { builder } from '@graphql/builder';

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
    return await context.container.get<VerifyUserService>(VerifyUserService).execute(args);
  },
}));
