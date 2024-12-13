import Button from '@/components/shared/Button';
import IconBars from '@/components/shared/IconBars';
import IconEllipsisHorizontal from '@/components/shared/IconEllipsisHorizontal';
import Navbar from '@/components/shared/Navbar';

import { classNames } from './styles.css';

import type React from 'react';

type StaredRepositoriesProps = {
  children: React.ReactNode;
};

const StaredRepositories: React.FC<StaredRepositoriesProps> = ({ children }) => {
  return (
    <div className={classNames.wrapper}>
      <Navbar className={classNames.navbar}>
        <div className="flex-none">
          <Button variant={{ color: 'ghost', shape: 'square' }}>
            <IconBars />
          </Button>
        </div>
        <div className="flex-1">
          <Button as="a" variant={{ color: 'ghost' }} className="text-xl">
            StarSpot
          </Button>
        </div>
        <div className="flex-none">
          <Button variant={{ color: 'ghost', shape: 'square' }}>
            <IconEllipsisHorizontal />
          </Button>
        </div>
      </Navbar>
      <div className={classNames.slot}>
        {children}
      </div>
    </div>
  );
};

export default StaredRepositories;
