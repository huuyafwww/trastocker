import { useForm, FormProvider } from 'react-hook-form';

import type React from 'react';
import type { FieldValues, SubmitHandler, DefaultValues, UseFormProps } from 'react-hook-form';

type FormProps<FormValues extends FieldValues> = {
  onSubmit: SubmitHandler<FormValues>;
  children: React.ReactNode;
  defaultValues?: DefaultValues<FormValues>;
} & UseFormProps<FormValues>;

const Form = <FormValues extends FieldValues>({
  defaultValues,
  children,
  onSubmit,
  ...props
}: FormProps<FormValues>) => {
  const methods = useForm<FormValues>({ defaultValues, ...props });
  return (
    <FormProvider {...methods} {...props}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
