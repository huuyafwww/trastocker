import { valibotResolver } from '@hookform/resolvers/valibot';
import { useForm } from 'react-hook-form';
import * as v from 'valibot';

import { PASSWORD_MIN_LENGTH } from '@/constants/password';

type LoginFormValues = {
  email: string;
  password: string;
};

const schema = v.object({
  email: v.pipe(
    v.string(),
    v.email(),
  ),
  password: v.pipe(
    v.string(),
    v.check(value => value.length >= PASSWORD_MIN_LENGTH, 'Password must be at least 12 characters long'),
    v.check(value => /[a-z]/.test(value), 'Password must contain at least one lowercase letter'),
    v.check(value => /[A-Z]/.test(value), 'Password must contain at least one uppercase letter'),
    v.check(value => /[0-9]/.test(value), 'Password must contain at least one number'),
    v.check(value => /[!-/:-@[-`{-~]/.test(value), 'Password must contain at least one special character'),
  ),
});

export const useLoginForm = () => {
  const methods = useForm<LoginFormValues>({
    resolver: valibotResolver(schema),
  });

  return {
    methods,
    handleSubmit: methods.handleSubmit((data) => {
      console.log(data);
    }),
  };
};
