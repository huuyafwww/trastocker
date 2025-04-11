import { useIsVerifyUser } from './logics';

import type { UseIsVerifyTokenProps } from './logics';

export type UserVerifyStatusProps = UseIsVerifyTokenProps;

const UserVerifyStatus: React.FC<UserVerifyStatusProps> = ({ verifyToken }) => {
  const { isVerified, isLoading } = useIsVerifyUser({ verifyToken });
  if (isLoading) return <div>Loading...</div>;
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
