import { useMemo } from 'react';

import { useRouter } from 'next/router';

import { useIsVerifyUser } from './logics';
import { wrapper, inner, logoWrapper, verifyMessageWrapper, loading } from './styles.css';

import type React from 'react';

import UserVerifyErrorMessage from '@components/domains/UserVerifyErrorMessage';
import UserVerifySuccessMessage from '@components/domains/UserVerifySuccessMessage';
import LogoTrastocker from '@components/shared/LogoTrastocker';

type UserVerifyPageProps = {};

const UserVerifyPage: React.FC<UserVerifyPageProps> = () => {
  const router = useRouter();
  const verifyToken = useMemo(() => (router.query.verifyToken || '') as string, [router.query.verifyToken]);
  const { isVerified, isLoading } = useIsVerifyUser({ verifyToken });
  return (
    <div className={wrapper}>
      <div className={inner}>
        <div className={logoWrapper}>
          <LogoTrastocker />
        </div>
        <div className={verifyMessageWrapper}>
          {isLoading && <span className={loading} />}
          {!isLoading && isVerified && <UserVerifySuccessMessage />}
          {!isLoading && !isVerified && <UserVerifyErrorMessage />}
        </div>

      </div>
    </div>
  );
};

export default UserVerifyPage;
