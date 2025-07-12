import React from 'react';

import { useButton, useObjectRef } from 'react-aria';
import { twMerge } from 'tailwind-merge';

import { classNames, variants, defaultVariant } from './styles.css';

import type { Variant } from './styles.css';
import type { AriaButtonProps } from 'react-aria';

export type ButtonProps = {
  as?: 'button' | 'a';
  children: React.ReactNode;
  className?: string;
  variant?: Partial<Variant>;
} & AriaButtonProps & (
  | ({ as?: 'button' } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as?: 'a' } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
);

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = ({
  children,
  as: Wrapper = 'button',
  ...props
}, forwardRef) => {
  const ref = useObjectRef(forwardRef);
  const { buttonProps } = useButton({
    elementType: Wrapper,
    ...props,
  }, ref);
  const variant: Variant = { ...defaultVariant, ...props.variant };

  return (
    <Wrapper
      {...buttonProps}
      className={twMerge([
        classNames.wrapper,
        variants.color[variant.color],
        variants.shape[variant.shape],
        variants.size[variant.size],
        variants.border[variant.border],
        props.className,
      ])}
    >
      {children}
    </Wrapper>
  );
};

export default React.forwardRef<HTMLButtonElement, ButtonProps>(Button);
