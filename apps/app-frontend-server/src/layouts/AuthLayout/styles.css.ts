import { twMerge } from 'tailwind-merge';

const wrapper = twMerge(
  'hero',
  'h-screen',
  'bg-base-200',
  'md:p-5',
);

const content = twMerge(
  'hero-content',
  'w-full',
  'lg:flex-row-reverse',
  'flex-col',
  'self-center',
  'justify-self-center',
);

const footer = twMerge(
  'self-end',
  'justify-self-center',
  'flex',
  'items-center',
  'gap-3',
  'flex-col',
);

const logoWrapper = twMerge(
  'w-36',
);

const copyRight = twMerge(
  'text-md',
  'text-center',
  'text-base-content',
);

export { wrapper, content, footer, logoWrapper, copyRight };
