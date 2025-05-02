import { Box } from '@trastocker/ui-elements';
import { twMerge } from 'tailwind-merge';

import { classNames } from './styles';

import type React from 'react';

export type NavbarProps = {
  children: React.ReactNode;
  className?: string;
};

const Navbar: React.FC<NavbarProps> = ({
  children,
  ...props
}) => {
  return (
    <Box
      {...props}
      className={twMerge(
        classNames.wrapper,
        props.className,
      )}
      as="nav"
    >
      {children}
    </Box>
  );
};

export default Navbar;
