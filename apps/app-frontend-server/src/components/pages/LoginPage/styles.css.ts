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

const logoWrapper = twMerge(
  'mt-4',
  'mb-8',
);

export { wrapper, inner, logoWrapper };
