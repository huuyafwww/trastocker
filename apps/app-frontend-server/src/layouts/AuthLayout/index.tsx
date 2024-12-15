import { Provider } from 'urql';

import useUrql from '@/hooks/useUrql';

import { wrapper, content } from './styles.css';

import type React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { client } = useUrql();
  return (
    <Provider value={client}>
      <div className={wrapper}>
        <div className={content}>
          {children}
        </div>
      </div>
    </Provider>
  );
};

export default AuthLayout;
