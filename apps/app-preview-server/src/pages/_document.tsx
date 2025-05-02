import { Html, Head, Main, NextScript } from 'next/document';

import type React from 'react';

const Document: React.FC = () => {
  return (
    <Html lang="ja" className="light">
      <Head>
        <link rel="icon" href="/trastocker.png" type="image/png" sizes="any" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
