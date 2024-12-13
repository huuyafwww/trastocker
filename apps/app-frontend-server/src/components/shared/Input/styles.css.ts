import { twMerge } from 'tailwind-merge';

const wrapper = twMerge('input');

export const variants = {
  color: {
    default: '',
    none: '',
    primary: 'input-primary',
    secondary: 'input-secondary',
    accent: 'input-accent',
    info: 'input-info',
    success: 'input-success',
    warning: 'input-warning',
    error: 'input-error',
    ghost: 'input-ghost',
  },
  size: {
    default: 'input-md',
    xs: 'input-xs',
    sm: 'input-sm',
    md: 'input-md',
    lg: 'input-lg',
  },
  border: {
    default: 'input-bordered',
    bordered: 'input-bordered',
    none: '',
  },
};

export type Variant = {
  color: keyof typeof variants.color;
  size: keyof typeof variants.size;
  border: keyof typeof variants.border;
};

export const defaultVariant: Variant = {
  color: 'none',
  size: 'md',
  border: 'bordered',
};

export const classNames = {
  wrapper,
};
