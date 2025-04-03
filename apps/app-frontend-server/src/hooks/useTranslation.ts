import { useMemo, useCallback } from 'react';

import { useRouter } from 'next/router';
import { useMount } from 'react-use';

import type { LocaleKey, FunctionLocaleKey } from '@locales';

import Trans from '@components/shared/Trans';
import { en, ja } from '@locales';

export const useTranslation = () => {
  const { locale } = useRouter();

  useMount(() => {
    const localeKeys = Array.from(new Set([
      ...Object.keys(en),
      ...Object.keys(ja),
    ]));

    const jaOnlyKeys = localeKeys.filter(key => !(key in en));
    if (jaOnlyKeys.length > 0) {
      console.error(jaOnlyKeys.map(key => `Key: ${key} is only in ja`).join('\n'));
    }

    const enOnlyKeys = localeKeys.filter(key => !(key in en));
    if (enOnlyKeys.length > 0) {
      console.error(enOnlyKeys.map(key => `Key: ${key} is only in en`).join('\n'));
    }
  });

  const targetLocale = useMemo(() => locale === 'en' ? en : ja, [locale]);
  const isKeyInLocale = useCallback((key: string) => {
    return key in targetLocale;
  }, [targetLocale]);

  const handleTranslation = useCallback(<K extends LocaleKey>(
    key: K,
    ...args: K extends FunctionLocaleKey ? [Parameters<typeof ja[K]>[0]] : []
  ): string => {
    if (typeof targetLocale[key] === 'function') {
      if (!args || args.length === 0) {
        throw new Error('props is required');
      }
      return targetLocale[key](args[0]);
    }
    return targetLocale[key];
  }, [targetLocale]);

  return {
    t: handleTranslation,
    Trans,
    isKeyInLocale,
  };
};
