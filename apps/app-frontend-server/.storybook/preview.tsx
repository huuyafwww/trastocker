import 'ress';
import '@styles/tailwind.css';
import '@styles/globals.css';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { Provider } from 'urql';

import type { Preview } from '@storybook/react';

import useUrql from '@hooks/useUrql';
import { setupDatabase, setupHandlers } from '@mocks';

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
        <Provider value={client}>
          <Story />
        </Provider>
      );
    },
  ],
};

export default preview;
