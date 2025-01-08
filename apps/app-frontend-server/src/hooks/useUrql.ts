import { useMemo } from 'react';

import { createClient, cacheExchange, fetchExchange } from 'urql';

import type { Client } from 'urql';

const useUrql = (): {
  client: Client;
} => {
  return useMemo(() => {
    const client = createClient({
      url: 'graphql',
      exchanges: [cacheExchange, fetchExchange],
      suspense: true,
    });

    return { client };
  }, []);
};

export default useUrql;
