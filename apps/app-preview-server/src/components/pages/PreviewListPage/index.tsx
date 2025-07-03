import { LogoTrastocker } from '@trastocker/ui-elements';

import { wrapper, inner, logoWrapper, buttonArea } from './styles.css';

import type React from 'react';

import PreviewButton from '@components/domains/PreviewButton';
import IconDatabase from '@components/shared/IconDatabase';
import LogoLiam from '@components/shared/LogoLiam';
import LogoStorybook from '@components/shared/LogoStorybook';

type PreviewListPageProps = {};

const PreviewListPage: React.FC<PreviewListPageProps> = () => {
  return (
    <div className={wrapper}>
      <div className={inner}>
        <div className={logoWrapper}>
          <LogoTrastocker />
        </div>

        <div className={buttonArea}>
          <PreviewButton
            icon={<LogoStorybook />}
            name="app-backend-server"
          />

          <PreviewButton
            icon={<LogoStorybook />}
            name="ui-elements"
          />

          <PreviewButton
            icon={<LogoLiam />}
            name="ERD by liam"
          />

          <PreviewButton
            icon={<IconDatabase />}
            name="ERD by tbls"
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewListPage;
