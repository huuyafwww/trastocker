import { LogoTrastocker } from '@trastocker/ui-elements';

import { wrapper, inner, logoWrapper, buttonArea } from './styles.css';

import type React from 'react';

import PreviewButton from '@components/domains/PreviewButton';
import { usePreviewLinks } from '@components/pages/PreviewListPage/logics';
import IconDatabase from '@components/shared/IconDatabase';
import LogoLiam from '@components/shared/LogoLiam';
import LogoStorybook from '@components/shared/LogoStorybook';

type PreviewListPageProps = {};

const PreviewListPage: React.FC<PreviewListPageProps> = () => {
  const links = usePreviewLinks();
  return (
    <div className={wrapper}>
      <div className={inner}>
        <div className={logoWrapper}>
          <LogoTrastocker />
        </div>

        <div className={buttonArea}>
          <PreviewButton
            link={links.appFrontendServer}
            icon={<LogoStorybook />}
            name="app-backend-server"
          />

          <PreviewButton
            link={links.uiElements}
            icon={<LogoStorybook />}
            name="ui-elements"
          />

          <PreviewButton
            link={links.liam}
            icon={<LogoLiam />}
            name="ERD by liam"
          />

          <PreviewButton
            link={links.tbls}
            icon={<IconDatabase />}
            name="ERD by tbls"
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewListPage;
