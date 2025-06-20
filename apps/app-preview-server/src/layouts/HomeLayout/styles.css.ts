import { twMerge } from 'tailwind-merge';

const wrapper = twMerge(
  'h-screen',
  'bg-base-200',
  'md:p-5',
  'flex',
  'flex-col',
  'justify-center',
);

const inner = twMerge(
  'hero',
  'flex',
  'flex-col',
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
  'self-center',
  'justify-self-center',
  'flex',
  'items-center',
  'gap-3',
  'flex-col',
  'mt-4',
);

const logoWrapper = twMerge(
  'w-36',
);

const copyRight = twMerge(
  'text-md',
  'text-center',
  'text-base-content',
);

export { wrapper, inner, content, footer, logoWrapper, copyRight };
