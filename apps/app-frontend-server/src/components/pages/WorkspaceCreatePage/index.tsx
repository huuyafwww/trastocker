import { Divider, LogoTrastocker } from '@trastocker/ui-elements';

import { wrapper, inner, logoWrapper, divider } from './styles.css';

import type React from 'react';

import WorkspaceCreateForm from '@components/domains/WorkspaceCreateForm';
import WorkspaceJoinForm from '@components/domains/WorkspaceJoinForm';
import { useTranslation } from '@hooks/useTranslation';

type WorkspaceCreatePageProps = {};

const WorkspaceCreatePage: React.FC<WorkspaceCreatePageProps> = () => {
  const { t } = useTranslation();
  return (
    <div className={wrapper}>
      <div className={inner}>
        <div className={logoWrapper}>
          <LogoTrastocker />
        </div>
        <WorkspaceCreateForm />
        <Divider className={divider}>{t('OR')}</Divider>
        <WorkspaceJoinForm />
      </div>
    </div>
  );
};

export default WorkspaceCreatePage;
