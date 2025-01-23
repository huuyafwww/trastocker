import { wrapper, inner, logoWrapper } from './styles.css';

import type React from 'react';

import WorkspaceCreateForm from '@components/domains/WorkspaceCreateForm';
import LogoTrastocker from '@components/shared/LogoTrastocker';

type WorkspaceCreatePageProps = {};

const WorkspaceCreatePage: React.FC<WorkspaceCreatePageProps> = () => {
  return (
    <div className={wrapper}>
      <div className={inner}>
        <div className={logoWrapper}>
          <LogoTrastocker />
        </div>
        <WorkspaceCreateForm />
      </div>
    </div>
  );
};

export default WorkspaceCreatePage;
