import type { NextPageWithLayout } from '@pages/_app';
import type { ReactElement } from 'react';

import UserVerifyPage from '@components/pages/UserVerifyPage';
import AuthLayout from '@layouts/AuthLayout';

const Index: NextPageWithLayout = () => {
  return <UserVerifyPage />;
};

Index.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Index;
