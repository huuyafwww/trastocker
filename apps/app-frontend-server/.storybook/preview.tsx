import 'ress';
import '@styles/tailwind.css';
import '@styles/globals.css';
import ms from 'ms';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { ToastContainer } from 'react-toastify';
import { withScreenshot } from 'storycap';
import { Provider } from 'urql';

import { connectDatabase, setupHandlers } from '../mocks';

import type { Preview } from '@storybook/react';

import useUrql from '@hooks/useUrql';

const promiseDatabase = connectDatabase();

const options: {
  serviceWorker?: {
    url: string;
  };
} = {};

// for GitHub Pages
if (location.hostname === 'huuyafwww.github.io') {
  options.serviceWorker = {
    url: '/trastocker/mockServiceWorker.js',
  };
}

initialize(options);

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
    msw: {
      handlers: setupHandlers(promiseDatabase),
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    screenshot: {
      fullPage: false,
      captureBeyondViewport: false,
      viewports: {
        desktop: {
          width: 1920,
          height: 1080,
        },
        tablet: {
          width: 820,
          height: 1180,
          hasTouch: true,
        },
        mobile: {
          width: 390,
          height: 844,
          hasTouch: true,
          isMobile: true,
        },
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    withScreenshot(),
  ],
};

export default preview;
