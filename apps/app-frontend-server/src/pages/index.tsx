import StaredRepositories from '@/layouts/StaredRepositories';

import type { NextPageWithLayout } from './_app';
import type { ReactElement } from 'react';

const Index: NextPageWithLayout = () => {
  return (
    <div className="" />
  );
};

Index.getLayout = (page: ReactElement) => {
  return <StaredRepositories>{page}</StaredRepositories>;
};

export default Index;
