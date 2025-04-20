import type { NextPageWithLayout } from '@pages/_app';
import type { ReactElement } from 'react';

import WorkspaceCreatePage from '@components/pages/WorkspaceCreatePage';
import AuthLayout from '@layouts/AuthLayout';

const Index: NextPageWithLayout = () => {
  return <WorkspaceCreatePage />;
};

Index.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Index;
