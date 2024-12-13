import { useTranslation } from '@/hooks/useTranslation';

import type { LocaleKey } from '@/locales';

type TransProps = {
  children: React.ReactNode;
};

const Trans: React.FC<TransProps> = ({ children }) => {
  const { t, isKeyInLocale } = useTranslation();

  if (typeof children !== 'string') {
    console.warn('Children must be a string.');
    return <>{children}</>;
  }

  if (!isKeyInLocale(children)) {
    console.warn(`Key "${children}" is not found in the locale files.`);
    return <>{children}</>;
  }

  return (
    <>{t(children as LocaleKey)}</>
  );
};

export default Trans;
