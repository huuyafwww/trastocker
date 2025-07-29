import '@styles/tailwind.css';
import '@styles/globals.css';
import { withScreenshot } from 'storycapture';

import type { Preview } from '@storybook/react-vite';

const options: {
  serviceWorker?: {
    url: string;
  };
  quiet: boolean;
  onUnhandledRequest: 'bypass';
} = {
  quiet: true,
  onUnhandledRequest: 'bypass',
};

// for GitHub Pages
if (location.hostname === 'huuyafwww.github.io') {
  options.serviceWorker = {
    url: '/trastocker/storybook/ui-elements/mockServiceWorker.js',
  };
}

// for Vercel
if (location.hostname.includes('vercel.app')) {
  options.serviceWorker = {
    url: '/storybook/ui-elements/mockServiceWorker.js',
  };
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    screenshot: {
      fullPage: false,
      captureBeyondViewport: false,
      delay: 500,
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
      return <Story />;
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    withScreenshot(),
  ],
};

export default preview;
