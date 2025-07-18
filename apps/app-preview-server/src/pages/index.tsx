import type { NextPageWithLayout } from './_app';
import type { ReactElement } from 'react';

import PreviewListPage from '@components/pages/PreviewListPage';
import HomeLayout from '@layouts/HomeLayout';

const Index: NextPageWithLayout = () => {
  return (
    <PreviewListPage />
  );
};

Index.getLayout = (page: ReactElement) => {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Index;
