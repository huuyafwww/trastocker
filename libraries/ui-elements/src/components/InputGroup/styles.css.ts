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
  'input',
  'input-bordered',
  'input-md',
  'flex',
  'items-center',
);

export { inputGroupWrapper, label, labelText, inputWrapper };
