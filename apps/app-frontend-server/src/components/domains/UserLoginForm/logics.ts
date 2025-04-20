import { useCallback, useMemo } from 'react';

import { valibotResolver } from '@hookform/resolvers/valibot';
import { UserEmailSchema, UserPasswordSchema } from '@trastocker/validation-schema-definition';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from 'urql';
import * as v from 'valibot';

import { loginUserMutation } from './gql';

import type { LoginUserMutation, LoginUserMutationVariables } from './gql';

import { useTranslation } from '@hooks/useTranslation';

type UserLoginFormValues = {
  email: string;
  password: string;
};

const schema = v.object({
  email: UserEmailSchema,
  password: UserPasswordSchema,
});

export const useUserLoginForm = () => {
  const { t } = useTranslation();
  const methods = useForm<UserLoginFormValues>({
    resolver: valibotResolver(schema),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, login] = useMutation<LoginUserMutation, LoginUserMutationVariables>(loginUserMutation);

  const canSubmit = useMemo(() => {
    if (methods.formState.isLoading) return false;
    if (methods.formState.isSubmitting) return false;
    if (methods.formState.isSubmitSuccessful) return false;
    return methods.formState.isValid;
  }, [methods.formState]);

  const handleSubmit = useCallback(async (data: UserLoginFormValues) => {
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
    canSubmit,
    methods,
    handleSubmit: methods.handleSubmit(handleSubmit),
  };
};
