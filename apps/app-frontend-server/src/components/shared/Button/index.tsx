import React from 'react';

import { useButton, useObjectRef } from 'react-aria';
import { twMerge } from 'tailwind-merge';

import { classNames, variants, defaultVariant } from './styles.css';

import type { Variant } from './styles.css';
import type { AriaButtonProps } from 'react-aria';

// type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
// type XOR<T, U> = T | U extends object ? (Without<T, U> & U) : T | U;

export type ButtonProps = {
  as?: 'button' | 'a';
  children: React.ReactNode;
  className?: string;
  variant?: Partial<Variant>;
} & AriaButtonProps & (
  | ({ as?: 'button' } & React.ComponentPropsWithRef<'button'>)
  | ({ as?: 'a' } & React.ComponentPropsWithRef<'a'>)
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
      className={twMerge(
        classNames.wrapper,
        variants.color[variant.color],
        variants.shape[variant.shape],
        variants.size[variant.size],
        variants.border[variant.border],
        props.className,
      )}
    >
      {children}
    </Wrapper>
  );
};

export default React.forwardRef<HTMLButtonElement, ButtonProps>(Button);
