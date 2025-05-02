import { twMerge } from 'tailwind-merge';

const wrapper = twMerge('btn');

export const variants = {
  color: {
    default: 'btn-primary',
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    danger: 'btn-danger',
    warning: 'btn-warning',
    success: 'btn-success',
    info: 'btn-info',
    link: 'btn-link',
  },
  shape: {
    none: '',
    square: 'btn-square',
    circle: 'btn-circle',
  },
  size: {
    unset: '',
    sm: 'btn-sm',
    lg: 'btn-lg',
  },
  border: {
    none: '',
    outline: 'btn-outline',
  },
};

export type Variant = {
  color: keyof typeof variants.color;
  shape: keyof typeof variants.shape;
  size: keyof typeof variants.size;
  border: keyof typeof variants.border;
};

export const defaultVariant: Variant = {
  color: 'primary',
  shape: 'none',
  size: 'unset',
  border: 'none',
};

export const classNames = {
  wrapper,
};
