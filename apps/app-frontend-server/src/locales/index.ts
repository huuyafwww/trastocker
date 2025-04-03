import type { FunctionKeys } from '@trastocker/typescript-utility-helper';

import en from '@locales/en';
import ja from '@locales/ja';

export {
  en,
  ja,
};

export type FunctionLocaleKey = Extract<FunctionKeys<typeof ja>, FunctionKeys<typeof en>>;
export type LocaleKey = Extract<keyof typeof en, keyof typeof ja>;
