import { UserEmailSchema, UserPasswordSchema } from '@trastocker/validation-schema-definition';
import ms from 'ms';

import { COOKIE } from '@constants/cookie';
import { INJECT_KEY } from '@constants/inject-key';
import { User } from '@domain/entities/user.entity';
import { builder } from '@graphql/builder';

import type { UserLoginUseCase } from '@application/use-cases/user-login.use-case';

builder.mutationField('loginUser', t => t.field({
  type: User,
  nullable: true,
  description: 'login user',
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
    const { user, userToken } = await context.container.get<UserLoginUseCase>(INJECT_KEY.UserLoginUseCase).execute(args);

    await context.request.cookieStore?.set({
      name: COOKIE.ACCESS_TOKEN,
      value: userToken.accessToken.toString(),
      domain: process.env.APP_DOMAIN,
      expires: new Date().getTime() + ms(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN),
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.APP_ENV === 'production',
    });

    await context.request.cookieStore?.set({
      name: COOKIE.REFRESH_TOKEN,
      value: userToken.refreshToken.toString(),
      domain: process.env.APP_DOMAIN,
      expires: new Date().getTime() + ms(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN),
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.APP_ENV === 'production',
    });

    return user;
  },
}));
