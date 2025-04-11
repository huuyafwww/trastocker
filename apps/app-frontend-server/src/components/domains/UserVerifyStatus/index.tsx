import { useIsVerifyUser } from './logics';

const UserVerifyStatus = () => {
  const { isVerified, isLoading } = useIsVerifyUser();
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
