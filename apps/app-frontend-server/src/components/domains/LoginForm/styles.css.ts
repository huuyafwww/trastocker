import { twMerge } from 'tailwind-merge';

const inputWrapper = twMerge(
  'form-control',
  'mt-4',
  'mb-8',
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

export { inputWrapper, logoWrapper, label, labelText, loginButtonWrapper };
