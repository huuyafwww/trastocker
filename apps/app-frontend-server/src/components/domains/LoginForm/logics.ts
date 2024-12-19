import { useCallback } from 'react';

import { valibotResolver } from '@hookform/resolvers/valibot';
import { UserEmailSchema, UserPasswordSchema } from '@trastocker/validation-schema-definition';
import { useForm } from 'react-hook-form';
import { useMutation } from 'urql';
import * as v from 'valibot';

import { loginUserMutation } from './gql';

import type { LoginUserMutation, LoginUserMutationVariables } from './gql';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, login] = useMutation<LoginUserMutation, LoginUserMutationVariables>(loginUserMutation);

  const handleSubmit = useCallback(async (data: LoginFormValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await login(data);
  }, [login]);

  return {
    methods,
    handleSubmit: methods.handleSubmit(handleSubmit),
  };
};
