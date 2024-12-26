import 'ress';
import '@styles/tailwind.css';
import '@styles/globals.css';
import ms from 'ms';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'urql';

import type { Preview } from '@storybook/react';

import useUrql from '@hooks/useUrql';
import { setupDatabase, setupHandlers } from '@mocks';

initialize();

const database = setupDatabase();

const preview: Preview = {
  loaders: [mswLoader],
  globalTypes: {
    locale: {
      description: 'Switch locale',
      toolbar: {
        title: 'Locale',
        icon: 'globe',
        items: ['ja', 'en'],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    locale: 'ja',
  },
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
        <Provider value={client}>
          <Story />
          <ToastContainer autoClose={ms('2s')} position="bottom-right" />
        </Provider>
      );
    },
  ],
};

export default preview;
