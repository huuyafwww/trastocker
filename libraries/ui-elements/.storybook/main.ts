import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: { docs: false },
    },
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  framework: '@storybook/react-vite',
  staticDirs: ['./public'],
  managerHead: (head) => {
    if (!process.env.STORYBOOK_UI_ELEMENTS_BASE_PATH) return head;
    return (`
        <base href="${process.env.STORYBOOK_UI_ELEMENTS_BASE_PATH}" />
        ${head}
      `);
  },
  viteFinal: async (config) => {
    const { default: tsconfigPathsPlugin } = await import('vite-tsconfig-paths'); // @see https://github.com/npm/cli/issues/7857
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
