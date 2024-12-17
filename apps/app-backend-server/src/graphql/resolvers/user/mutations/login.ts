import { UserEmailSchema, UserPasswordSchema } from '@trastocker/validation-schema-definition';

import { UserLoginUseCase } from '@application/use-cases/user-login.use-case';
import { CookieKeys } from '@constants/cookie';
import { builder } from '@graphql/builder';

import { User } from '../types/user';

builder.mutationField('login', t => t.field({
  type: User,
  description: 'login',
  args: {
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
    const { user, userToken } = await context.container.get<UserLoginUseCase>(UserLoginUseCase).execute(args);

    await context.request.cookieStore?.set(CookieKeys.ACCESS_TOKEN, userToken.accessToken.toString());

    return user.serialize();
  },
}));
