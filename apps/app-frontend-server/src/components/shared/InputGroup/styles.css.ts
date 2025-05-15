import { twMerge } from 'tailwind-merge';

const inputGroupWrapper = twMerge(
  'form-control',
  'mt-4',
  'mb-8',
);

const label = twMerge(
  'label',
  'cursor-pointer',
);

const labelText = twMerge(
  'label-text',
);

const inputWrapper = twMerge(
  'w-full',
  'input',
  'input-bordered',
  'input-lg',
  'flex',
  'items-center',
);

export { inputGroupWrapper, label, labelText, inputWrapper };
