import { Button, IconBars, IconEllipsisHorizontal, Navbar } from '@trastocker/ui-elements';

import { classNames } from './styles.css';

import type React from 'react';

type HomeLayoutProps = {
  children: React.ReactNode;
};

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
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
            Trastocker
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

export default HomeLayout;
