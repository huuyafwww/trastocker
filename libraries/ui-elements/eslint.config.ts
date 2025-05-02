import { browser } from '@huuyafwww/eslint-config-browser';
import { common } from '@huuyafwww/eslint-config-common';
import { react } from '@huuyafwww/eslint-config-react';
import { storybook } from '@huuyafwww/eslint-config-storybook';
import { define } from '@praha/eslint-config-definer';

import type { Linter } from 'eslint';

const config = define([
  () => ([{
    ignores: [
      'postcss.config.cjs',
      'tailwind.config.ts',
      'storybook-static/**',
      '.storybook/public/**',
    ],
  }]),
  common,
  browser,
  react,
  storybook,
]);

export default config({
  tsconfigPath: './tsconfig.json',
}) satisfies Linter.Config[];
