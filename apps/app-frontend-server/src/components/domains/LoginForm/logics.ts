import { useCallback } from 'react';

import { valibotResolver } from '@hookform/resolvers/valibot';
import { UserEmailSchema, UserPasswordSchema } from '@trastocker/validation-schema-definition';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from 'urql';
import * as v from 'valibot';

import { loginUserMutation } from './gql';

import type { LoginUserMutation, LoginUserMutationVariables } from './gql';

import { useTranslation } from '@hooks/useTranslation';

type LoginFormValues = {
  email: string;
  password: string;
};

const schema = v.object({
  email: UserEmailSchema,
  password: UserPasswordSchema,
});

export const useLoginForm = () => {
  const { t } = useTranslation();
  const methods = useForm<LoginFormValues>({
    resolver: valibotResolver(schema),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, login] = useMutation<LoginUserMutation, LoginUserMutationVariables>(loginUserMutation);

  const handleSubmit = useCallback(async (data: LoginFormValues) => {
    const result = await login(data);

    if (!result.data?.loginUser) {
      toast.error(t('Email address or password is incorrect.'));
      return;
    }

    if (result.error) {
      toast.error(t('Login failed'));
      return;
    }

    // TODO: redirect to logined page
  }, [login, t]);

  return {
    methods,
    handleSubmit: methods.handleSubmit(handleSubmit),
  };
};
