import { useIsVerifyUser } from './logics';
import { loading } from './styles.css';

import type { UseIsVerifyTokenProps } from './logics';

import { useTranslation } from '@hooks/useTranslation';

export type UserVerifyStatusProps = UseIsVerifyTokenProps;

const UserVerifyStatus: React.FC<UserVerifyStatusProps> = ({ verifyToken }) => {
  const { isVerified, isLoading } = useIsVerifyUser({ verifyToken });
  const { t } = useTranslation();
  if (isLoading) return <span className={loading} />;
  return (
    <div>
      {isVerified
        ? (
            <div>{t('User registration success')}</div>
          )
        : (
            <div>{t('User registration failed')}</div>

          )}
    </div>
  );
};

export default UserVerifyStatus;
