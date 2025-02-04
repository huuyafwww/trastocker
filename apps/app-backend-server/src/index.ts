import { blockFieldSuggestionsPlugin } from '@escape.tech/graphql-armor-block-field-suggestions';
import { useDisableIntrospection } from '@graphql-yoga/plugin-disable-introspection';
import { useCookies } from '@whatwg-node/server-plugin-cookies';
import { createYoga } from 'graphql-yoga';

import { GetAuthUserUseCase } from '@application/use-cases/get-auth-user.use-case';
import { CookieKeys } from '@constants/cookie';
import { schema } from '@graphql/schema';

import { createContainer } from './inversify.config';

import type { User } from '@domain/entities/user.entity';
import type { Container } from 'inversify';

export type Context = {
  container: Container;
  authUser: User | null;
};

export default {
  fetch(request: Request, env: NodeJS.ProcessEnv) {
    Object.assign(process.env, env);

    const isLocal = env.APP_ENV === 'local';
    return (createYoga<
      NodeJS.ProcessEnv,
      Context
    >({
      schema,
      graphiql: isLocal,
      plugins: [
        useDisableIntrospection({
          isDisabled: () => !isLocal,
        }),
        blockFieldSuggestionsPlugin(),
        useCookies(),
      ],
      batching: true,
      logging: isLocal ? 'debug' : 'info',
      context: async (context) => {
        const container = createContainer({ database: context.DB });
        const accessToken = await context.request.cookieStore?.get(CookieKeys.ACCESS_TOKEN);
        const refreshToken = await context.request.cookieStore?.get(CookieKeys.REFRESH_TOKEN);
        if (!accessToken || !refreshToken) {
          return { container, authUser: null };
        }

        try {
          const authUser = await container.get<GetAuthUserUseCase>(GetAuthUserUseCase).execute({
            accessToken: accessToken.value,
            refreshToken: refreshToken.value,
          });
          return { container, authUser };
        }
        catch {
          return { container, authUser: null };
        }
      },
    })).fetch(request, env);
  },
};
