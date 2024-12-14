import { useMemo } from 'react';

import { useFormContext, useController } from 'react-hook-form';

import Input from '@/components/shared/Input';

import type { InputProps } from '@/components/shared/Input';
import type { FieldValues, FieldPath, Path, PathValue, RegisterOptions } from 'react-hook-form';

export type InputControlProps<FormValues extends FieldValues> = {
  name: FieldPath<FormValues>;
  defaultValue?: PathValue<FormValues, Path<FormValues>>;
  disabled?: boolean;
  readonly?: boolean;
  rules?: Omit<RegisterOptions<FormValues, Path<FormValues>>, 'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
} & InputProps;

const InputControl = <FormValues extends FieldValues>({
  name,
  defaultValue,
  disabled = false,
  readonly = false,
  rules = {},
  ...props
}: InputControlProps<FormValues>) => {
  const { control } = useFormContext<FormValues>();
  const { field } = useController<FormValues>({
    name,
    defaultValue,
    disabled,
    control,
    rules,
  });

  const required = useMemo(() => {
    if (rules.required === undefined) return false;
    if (typeof rules.required === 'string') return true;
    if (typeof rules.required === 'boolean') return rules.required;
    return !!rules?.required?.value;
  }, [rules]);

  return (
    <Input
      {...props}
      {...field}
      isDisabled={field.disabled}
      isRequired={required}
      isReadOnly={readonly}
    />
  );
};

export default InputControl;
