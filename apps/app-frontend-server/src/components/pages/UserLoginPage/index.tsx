import { LogoTrastocker } from '@trastocker/ui-elements';

import { wrapper, inner, logoWrapper } from './styles.css';

import type React from 'react';

import UserLoginForm from '@components/domains/UserLoginForm';

type UserLoginPageProps = {};

const UserLoginPage: React.FC<UserLoginPageProps> = () => {
  return (
    <div className={wrapper}>
      <div className={inner}>
        <div className={logoWrapper}>
          <LogoTrastocker />
        </div>
        <UserLoginForm />
      </div>
    </div>
  );
};

export default UserLoginPage;
