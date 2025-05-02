import { twMerge } from 'tailwind-merge';

import { variants, defaultVariant, classNames } from './styles.css';

import type { Variant } from './styles.css';
import type React from 'react';

export type BoxProps = {
  children: React.ReactNode;
  className?: string;
  variant?: Partial<Variant>;
  as?: React.ElementType;
};

const Box: React.FC<BoxProps> = ({
  children,
  as: Wrapper = 'div',
  ...props
}) => {
  const variant: Variant = { ...defaultVariant, ...props.variant };
  return (
    <Wrapper
      {...props}
      className={twMerge(
        classNames.wrapper,
        variants.border[variant.border],
        variants.shadow[variant.shadow],
        props.className,
      )}
    >
      {children}
    </Wrapper>
  );
};

export default Box;
