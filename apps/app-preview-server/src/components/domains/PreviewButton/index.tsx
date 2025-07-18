import { Button } from '@trastocker/ui-elements';

import { wrapper, iconWrapper } from './styles.css';

import type React from 'react';

type PreviewButtonProps = {
  icon: React.ReactNode;
  name: string;
  link?: string;
};

const PreviewButton: React.FC<PreviewButtonProps> = ({
  icon,
  name,
  link,
}) => {
  return (
    <Button
      className={wrapper}
      as="a"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      variant={{
        color: 'none',
        size: 'lg',
        border: 'outline',
      }}
    >
      <div className={iconWrapper}>
        {icon}
      </div>
      {name}
    </Button>
  );
};

export default PreviewButton;
