import { useMemo } from 'react';

import { useCookies } from 'react-cookie';
import { createClient, cacheExchange, fetchExchange } from 'urql';

import { CookieKeys } from '@/constants/cookie';

import type { Client } from 'urql';

const useUrql = (): {
  client: Client;
} => {
  const [cookies] = useCookies([CookieKeys.ACCESS_TOKEN]);
  return useMemo(() => {
    const client = createClient({
      url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_URL,
      exchanges: [cacheExchange, fetchExchange],
      suspense: true,
      fetchOptions: () => {
        if (!cookies[CookieKeys.ACCESS_TOKEN]) {
          return { headers: { authorization: '' } };
        }

        const token = cookies[CookieKeys.ACCESS_TOKEN] as string;
        return {
          headers: { authorization: `Bearer ${token}` },
        };
      },
    });

    return { client };
  }, [cookies]);
};

export default useUrql;
