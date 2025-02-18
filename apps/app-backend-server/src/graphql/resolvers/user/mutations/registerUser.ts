import { UserNameSchema, UserEmailSchema, UserPasswordSchema } from '@trastocker/validation-schema-definition';

import { User } from '@domain/entities/user.entity';
import { CreateUserService } from '@domain/services/create-user.service';
import { builder } from '@graphql/builder';

builder.mutationField('registerUser', t => t.field({
  type: User,
  nullable: true,
  description: 'register user',
  args: {
    name: t.arg.string({
      description: 'name',
      validate: { schema: UserNameSchema },
    }),
    email: t.arg.string({
      description: 'email',
      validate: { schema: UserEmailSchema },
    }),
    password: t.arg.string({
      description: 'password',
      validate: { schema: UserPasswordSchema },
    }),
  },
  resolve: async (_, args, context) => {
    return await context.container.get<CreateUserService>(CreateUserService).execute(args);
  },
}));
