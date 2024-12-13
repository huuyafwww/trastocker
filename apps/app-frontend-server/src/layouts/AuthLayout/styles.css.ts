import { twMerge } from 'tailwind-merge';

const wrapper = twMerge(
  'hero',
  'bg-base-200',
  'h-screen',
);

const content = twMerge(
  'flex-col',
  'hero-content',
  'lg:flex-row-reverse',
  'w-full',
);

export { wrapper, content };
