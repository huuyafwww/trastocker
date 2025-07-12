import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';

import type { StorybookConfig } from '@storybook/experimental-nextjs-vite';

const config: StorybookConfig = {
  stories: ['../src/**/stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: { docs: false },
    },
    '@storybook/addon-actions',
    'storycap',
  ],
  typescript: {
    reactDocgen: 'react-docgen',
  },
  framework: '@storybook/experimental-nextjs-vite',
  staticDirs: ['./public'],
  managerHead: (head) => {
    if (!process.env.STORYBOOK_APP_FRONTEND_SERVER_BASE_PATH) return head;
    return (`
        <base href="${process.env.STORYBOOK_APP_FRONTEND_SERVER_BASE_PATH}" />
        ${head}
      `);
  },
  viteFinal: (config) => {
    return {
      ...config,
      plugins: [
        ...(config.plugins ?? []),
        vanillaExtractPlugin(),
        tsconfigPathsPlugin(),
      ],
    };
  },
};
export default config;
