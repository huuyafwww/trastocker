import { useIsVerifyUser } from './logics';
import { loading } from './styles.css';

import type { UseIsVerifyTokenProps } from './logics';

export type UserVerifyStatusProps = UseIsVerifyTokenProps;

const UserVerifyStatus: React.FC<UserVerifyStatusProps> = ({ verifyToken }) => {
  const { isVerified, isLoading } = useIsVerifyUser({ verifyToken });
  if (isLoading) return <span className={loading} />;
  return (
    <div>
      {isVerified
        ? (
            <div>User is verified</div>
          )
        : (
            <div>User is not verified</div>
          )}
    </div>
  );
};

export default UserVerifyStatus;
