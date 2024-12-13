import { UserLoginUseCase } from '@application/use-cases/user-login.use-case';
import { CookieKeys } from '@constants/cookie';
import { builder } from '@graphql/builder';

import { User } from '../types/user';

builder.mutationField('login', t => t.field({
  type: User,
  description: 'login',
  args: {
    email: t.arg.string({ description: 'email' }),
    password: t.arg.string({ description: 'password' }),
  },
  resolve: async (_, args, context) => {
    const { user, userToken } = await context.container.get<UserLoginUseCase>(UserLoginUseCase).execute(args);

    await context.request.cookieStore?.set(CookieKeys.ACCESS_TOKEN, userToken.accessToken.toString());

    return user.serialize();
  },
}));
