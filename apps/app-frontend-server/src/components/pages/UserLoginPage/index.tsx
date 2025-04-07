import { wrapper, inner, logoWrapper } from './styles.css';

import type React from 'react';

import LoginForm from '@components/domains/LoginForm';
import LogoTrastocker from '@components/shared/LogoTrastocker';

type UserLoginPageProps = {};

const UserLoginPage: React.FC<UserLoginPageProps> = () => {
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

export default UserLoginPage;
