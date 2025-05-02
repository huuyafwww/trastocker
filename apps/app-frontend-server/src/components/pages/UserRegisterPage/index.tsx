import { LogoTrastocker } from '@trastocker/ui-elements';

import { wrapper, inner, logoWrapper } from './styles.css';

import type React from 'react';

import UserRegisterForm from '@components/domains/UserRegisterForm';

type UserRegisterPageProps = {};

const UserRegisterPage: React.FC<UserRegisterPageProps> = () => {
  return (
    <div className={wrapper}>
      <div className={inner}>
        <div className={logoWrapper}>
          <LogoTrastocker />
        </div>
        <UserRegisterForm />
      </div>
    </div>
  );
};

export default UserRegisterPage;
