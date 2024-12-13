import { twMerge } from 'tailwind-merge';

const inputWrapper = twMerge(
  'form-control',
);

const label = twMerge(
  'label',
);

const labelText = twMerge(
  'label-text',
);

export { inputWrapper, label, labelText };
