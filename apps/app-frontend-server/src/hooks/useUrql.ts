import { useMemo } from 'react';

import { cookies } from 'next/headers';
import { createClient, cacheExchange, fetchExchange } from 'urql';

import { CookieKeys } from '@/constants/cookie';

import type { Client } from 'urql';

const useUrql = (): {
  client: Client;
} => {
  return useMemo(() => {
    const client = createClient({
      url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_URL,
      exchanges: [cacheExchange, fetchExchange],
      suspense: true,
      fetchOptions: () => {
        const cookieStore = cookies();
        const token = cookieStore.get(CookieKeys.ACCESS_TOKEN);
        return {
          headers: { authorization: token ? `Bearer ${token.value}` : '' },
        };
      },
    });

    return { client };
  }, []);
};

export default useUrql;
