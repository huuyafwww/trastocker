import { twMerge } from 'tailwind-merge';

const wrapper = twMerge(
  'flex',
  'flex-col',
  'p-4',
  'h-screen',
);

const navbar = twMerge(
  'mb-4',
);

const slot = twMerge(
  'flex',
  'gap-4',
  'h-full',
);

export const classNames = {
  wrapper,
  navbar,
  slot,
};
