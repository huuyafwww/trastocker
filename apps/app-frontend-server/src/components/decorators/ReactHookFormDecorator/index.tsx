import { action } from '@storybook/addon-actions';
import { useForm, FormProvider } from 'react-hook-form';

import type { FieldValues } from 'react-hook-form';

const ReactHookFormDecorator = <T extends FieldValues>(Story: React.FC) => {
  const methods = useForm<T>();
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(action('submit!'))}
      >
        <Story />
      </form>
    </FormProvider>
  );
};

export default ReactHookFormDecorator;
