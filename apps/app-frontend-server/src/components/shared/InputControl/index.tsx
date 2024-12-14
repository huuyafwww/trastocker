import { useFormContext, useController } from 'react-hook-form';

import Input from '@/components/shared/Input';

import type { InputProps } from '@/components/shared/Input';
import type { FieldValues, FieldPath, Path, PathValue } from 'react-hook-form';

export type InputControlProps<FormValues extends FieldValues> = {
  name: FieldPath<FormValues>;
  defaultValue?: PathValue<FormValues, Path<FormValues>>;
  disabled?: boolean;
} & InputProps;

const InputControl = <FormValues extends FieldValues>({
  name,
  defaultValue,
  disabled = false,
  ...props
}: InputControlProps<FormValues>) => {
  const { control } = useFormContext<FormValues>();
  const { field } = useController<FormValues>({
    ...props,
    name,
    defaultValue,
    disabled,
    control,
  });
  return (
    <Input
      {...props}
      {...field}
      isDisabled={field.disabled}
    />
  );
};

export default InputControl;
