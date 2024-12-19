import { twMerge } from 'tailwind-merge';

const inputGroupWrapper = twMerge(
  'form-control',
  'mt-4',
  'mb-8',
);

const inputWrapper = twMerge(
  'input',
  'input-bordered',
  'input-md',
  'flex',
  'items-center',
);

const input = twMerge(
  'grow',
);

const iconButton = twMerge(
  'min-h-10',
  'h-10',
);

const logoWrapper = twMerge(
  'mt-4',
  'mb-8',
);

const label = twMerge(
  'label',
);

const labelText = twMerge(
  'label-text',
);

const loginButtonWrapper = twMerge(
  'form-control',
  'mt-10',
);

export { inputGroupWrapper, inputWrapper, input, iconButton, logoWrapper, label, labelText, loginButtonWrapper };
