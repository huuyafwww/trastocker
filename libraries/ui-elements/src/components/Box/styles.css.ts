import { style } from '@vanilla-extract/css';
import { twMerge } from 'tailwind-merge';

const wrapper = twMerge(
  'bg-base-100',
  style({
    padding: '0.5rem',
  }),
);

export const variants = {
  border: {
    default: 'rounded-box',
    none: '',
  },
  shadow: {
    default: 'shadow-xl',
    none: '',
  },
};

export type Variant = {
  border: keyof typeof variants.border;
  shadow: keyof typeof variants.shadow;
};

export const defaultVariant: Variant = {
  border: 'default',
  shadow: 'default',
};

export const classNames = {
  wrapper,
};
