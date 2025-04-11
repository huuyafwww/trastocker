import { useMemo } from 'react';

import { useRouter } from 'next/router';

import { wrapper, inner, logoWrapper } from './styles.css';

import type React from 'react';

import UserVerifyStatus from '@components/domains/UserVerifyStatus';
import LogoTrastocker from '@components/shared/LogoTrastocker';

type UserVerifyPageProps = {};

const UserVerifyPage: React.FC<UserVerifyPageProps> = () => {
  const router = useRouter();
  const verifyToken = useMemo(() => (router.query.verifyToken || '') as string, [router.query.verifyToken]);
  return (
    <div className={wrapper}>
      <div className={inner}>
        <div className={logoWrapper}>
          <LogoTrastocker />
        </div>
        <UserVerifyStatus verifyToken={verifyToken} />
      </div>
    </div>
  );
};

export default UserVerifyPage;
