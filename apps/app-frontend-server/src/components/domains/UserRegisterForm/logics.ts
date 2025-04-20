import { useCallback, useMemo } from 'react';

import { valibotResolver } from '@hookform/resolvers/valibot';
import { UserNameSchema, UserEmailSchema, UserPasswordSchema } from '@trastocker/validation-schema-definition';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from 'urql';
import * as v from 'valibot';

import { registerUserMutation } from './gql';

import type { RegisterUserMutation, RegisterUserMutationVariables } from './gql';

import { useTranslation } from '@hooks/useTranslation';

type UserRegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

export const schema = v.object({
  name: UserNameSchema,
  email: UserEmailSchema,
  password: UserPasswordSchema,
});

export const useUserRegisterForm = () => {
  const { t } = useTranslation();
  const methods = useForm<UserRegisterFormValues>({
    resolver: valibotResolver(schema),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, register] = useMutation<RegisterUserMutation, RegisterUserMutationVariables>(registerUserMutation);

  const canSubmit = useMemo(() => {
    if (methods.formState.isLoading) return false;
    if (methods.formState.isSubmitting) return false;
    if (methods.formState.isSubmitSuccessful) return false;
    return methods.formState.isValid;
  }, [methods.formState]);

  const handleSubmit = useCallback(async (data: UserRegisterFormValues) => {
    const result = await register(data);

    if (!result.data?.registerUser) {
      toast.error(t('Email address or password is incorrect.'));
      return;
    }

    if (result.error) {
      toast.error(t('User Register failed'));
      return;
    }

    toast.success(
      t('Send a temporary user registration', { email: data.email }),
      { autoClose: false, closeButton: false },
    );
  }, [register, t]);

  return {
    canSubmit,
    methods,
    handleSubmit: methods.handleSubmit(handleSubmit),
  };
};
