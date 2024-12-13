import en from '@/locales/en';
import ja from '@/locales/ja';

export {
  en,
  ja,
};

export type LocaleKey = Extract<keyof typeof en, keyof typeof ja>;
