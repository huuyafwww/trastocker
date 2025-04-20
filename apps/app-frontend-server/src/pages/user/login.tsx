import type { NextPageWithLayout } from '@pages/_app';
import type { ReactElement } from 'react';

import UserLoginPage from '@components/pages/UserLoginPage';
import AuthLayout from '@layouts/AuthLayout';

const Index: NextPageWithLayout = () => {
  return <UserLoginPage />;
};

Index.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Index;
