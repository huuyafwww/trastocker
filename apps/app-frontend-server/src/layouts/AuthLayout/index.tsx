import { wrapper, content } from './styles.css';

import type React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className={wrapper}>
      <div className={content}>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
