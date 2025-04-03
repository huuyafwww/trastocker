import type { NextPageWithLayout } from '@pages/_app';
import type { ReactElement } from 'react';

import UserRegisterPage from '@components/pages/UserRegisterPage';
import AuthLayout from '@layouts/AuthLayout';

const Index: NextPageWithLayout = () => {
  return <UserRegisterPage />;
};

Index.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Index;
