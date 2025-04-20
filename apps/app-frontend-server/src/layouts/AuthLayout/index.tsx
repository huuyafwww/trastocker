import { wrapper, inner, content, footer, logoWrapper, copyRight } from './styles.css';

import type React from 'react';

import LogoTrastocker from '@components/shared/LogoTrastocker';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className={wrapper}>
      <div className={inner}>
        <div className={content}>
          {children}
        </div>
        <footer className={footer}>
          <div className={logoWrapper}>
            <LogoTrastocker />
          </div>
          <p className={copyRight}>
            © 2024 Trastocker.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AuthLayout;
