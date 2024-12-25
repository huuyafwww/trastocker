import 'ress';
import '@styles/tailwind.css';
import '@styles/globals.css';
import '@styles/app.css';
import { Noto_Sans_JP } from 'next/font/google';
import { Provider } from 'urql';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';

import useUrql from '@hooks/useUrql';

const notoSansJp = Noto_Sans_JP({
  weight: ['400', '700'],
  display: 'swap',
  subsets: ['latin'],
});

export type NextPageWithLayout<P = object> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { client } = useUrql();
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <Provider value={client}>
      {getLayout(<Component className={notoSansJp.className} {...pageProps} />)}
    </Provider>
  );
};

export default App;
