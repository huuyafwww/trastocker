import { wrapper, inner, logoWrapper } from './styles.css';

import type React from 'react';

import LoginForm from '@components/domains/LoginForm';
import LogoTrastocker from '@components/shared/LogoTrastocker';

type LoginPageProps = {};

const LoginPage: React.FC<LoginPageProps> = () => {
  return (
    <div className={wrapper}>
      <div className={inner}>
        <div className={logoWrapper}>
          <LogoTrastocker />
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
