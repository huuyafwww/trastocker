import { wrapper, inner, logoWrapper } from './styles.css';

import type React from 'react';

import UserRegisterForm from '@components/domains/UserRegisterForm';
import LogoTrastocker from '@components/shared/LogoTrastocker';

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
