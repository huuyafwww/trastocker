import { browser } from '@huuyafwww/eslint-config-browser';
import { common } from '@huuyafwww/eslint-config-common';
import { javascript } from '@huuyafwww/eslint-config-javascript';
import { next } from '@huuyafwww/eslint-config-next';
import { react } from '@huuyafwww/eslint-config-react';
import { typescript } from '@huuyafwww/eslint-config-typescript';
import { define } from '@praha/eslint-config-definer';

import type { Linter } from 'eslint';

const config = define([
  () => ([{
    ignores: [
      'next.config.mjs',
      'postcss.config.mjs',
      'tailwind.config.ts',
    ],
  }]),
  common,
  javascript,
  typescript,
  browser,
  react,
  next,
]);

export default config({
  tsconfigPath: './tsconfig.json',
}) satisfies Linter.Config[];
