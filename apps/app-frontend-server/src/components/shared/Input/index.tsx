import React from 'react';

import { useObjectRef, useTextField } from 'react-aria';
import { twMerge } from 'tailwind-merge';

import { classNames, variants, defaultVariant } from './styles.css';

import type { Variant } from './styles.css';
import type { AriaTextFieldProps } from 'react-aria';

export type InputProps = {
  className?: string;
  variant?: Partial<Variant>;
} & AriaTextFieldProps;

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ ...props }, forwardRef) => {
  const ref = useObjectRef(forwardRef);
  const { inputProps } = useTextField({ ...props }, ref);
  const variant: Variant = { ...defaultVariant, ...props.variant };
  return (
    <input
      {...inputProps}
      className={twMerge(
        classNames.wrapper,
        variants.color[variant.color],
        variants.size[variant.size],
        variants.border[variant.border],
        props.className,
      )}
    />
  );
};

export default React.forwardRef<HTMLInputElement, InputProps>(Input);
