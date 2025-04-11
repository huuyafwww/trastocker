import { wrapper, inner, logoWrapper } from './styles.css';

import type React from 'react';

import UserVerifyStatus from '@components/domains/UserVerifyStatus';
import LogoTrastocker from '@components/shared/LogoTrastocker';

type UserVerifyPageProps = {};

const UserVerifyPage: React.FC<UserVerifyPageProps> = () => {
  return (
    <div className={wrapper}>
      <div className={inner}>
        <div className={logoWrapper}>
          <LogoTrastocker />
        </div>
        <UserVerifyStatus />
      </div>
    </div>
  );
};

export default UserVerifyPage;
