import type { NextPageWithLayout } from './_app';
import type { ReactElement } from 'react';

import HomeLayout from '@layouts/HomeLayout';

const Index: NextPageWithLayout = () => {
  return (
    <div className="" />
  );
};

Index.getLayout = (page: ReactElement) => {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Index;
