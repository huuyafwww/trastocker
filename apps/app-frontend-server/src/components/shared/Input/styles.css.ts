export const variants = {
  mode: {
    only: 'input',
    with: '',
  },
  color: {
    none: '',
    primary: 'input-primary',
    secondary: 'input-secondary',
    accent: 'input-accent',
    info: 'input-info',
    success: 'input-success',
    warning: 'input-warning',
    error: 'input-error',
    ghost: 'input-ghost',
  },
  size: {
    xs: 'input-xs',
    sm: 'input-sm',
    md: 'input-md',
    lg: 'input-lg',
    none: '',
  },
  border: {
    bordered: 'input-bordered',
    none: '',
  },
};

export type Variant = {
  mode: keyof typeof variants.mode;
  color: keyof typeof variants.color;
  size: keyof typeof variants.size;
  border: keyof typeof variants.border;
};

export const defaultVariant: Variant = {
  mode: 'only',
  color: 'none',
  size: 'md',
  border: 'bordered',
};
