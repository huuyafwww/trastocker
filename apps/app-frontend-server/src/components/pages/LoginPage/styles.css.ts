import { twMerge } from 'tailwind-merge';

const wrapper = twMerge(
  'card',
  'shrink-0',
  'w-full',
  'max-w-lg',
  'shadow-2xl',
  'bg-base-100',
);

const inner = twMerge(
  'card-body',
);

export { wrapper, inner };
