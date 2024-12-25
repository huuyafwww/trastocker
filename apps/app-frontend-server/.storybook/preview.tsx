import 'ress';
import '@/styles/tailwind.css';
import '@/styles/globals.css';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'urql';

import useUrql from '@/hooks/useUrql';
import { setupDatabase, setupHandlers } from '@/mocks';

import type { Preview } from '@storybook/react';

initialize();

const database = setupDatabase();

const preview: Preview = {
  loaders: [mswLoader],
  parameters: {
    msw: { handlers: setupHandlers(database) },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      const { client } = useUrql();
      return (
        <CookiesProvider>
          <Provider value={client}>
            <Story />
          </Provider>
        </CookiesProvider>
      );
    },
  ],
};

export default preview;
