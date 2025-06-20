import { style } from '@vanilla-extract/css';
import { twMerge } from 'tailwind-merge';

const wrapper = twMerge(
  style({
    fontSize: 'var(--text-xl);',
    gap: 'calc(var(--spacing) * 6)',
  }),
);

const iconWrapper = twMerge(
  'size-6',
);

export { wrapper, iconWrapper };
