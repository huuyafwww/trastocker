import LoginPage from '@/components/pages/LoginPage';
import AuthLayout from '@/layouts/AuthLayout';

import type { NextPageWithLayout } from './_app';
import type { ReactElement } from 'react';

const Index: NextPageWithLayout = () => {
  return <LoginPage />;
};

Index.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Index;
