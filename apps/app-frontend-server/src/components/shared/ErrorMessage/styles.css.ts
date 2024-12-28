import { twMerge } from 'tailwind-merge';

const wrapper = twMerge(
  'text-sm',
  'text-error',
  'flex',
  'gap-2',
  'items-center',
);

export const classNames = {
  wrapper,
};
