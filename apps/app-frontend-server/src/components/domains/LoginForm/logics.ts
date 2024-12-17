import { useCallback } from 'react';

import { valibotResolver } from '@hookform/resolvers/valibot';
import { UserEmailSchema, UserPasswordSchema } from '@trastocker/validation-schema-definition';
import { useForm } from 'react-hook-form';
import * as v from 'valibot';

type LoginFormValues = {
  email: string;
  password: string;
};

const schema = v.object({
  email: UserEmailSchema,
  password: UserPasswordSchema,
});

export const useLoginForm = () => {
  const methods = useForm<LoginFormValues>({
    resolver: valibotResolver(schema),
  });

  const handleSubmit = useCallback((data: LoginFormValues) => {
    console.log(data);
  }, []);

  return {
    methods,
    handleSubmit: methods.handleSubmit(handleSubmit),
  };
};
