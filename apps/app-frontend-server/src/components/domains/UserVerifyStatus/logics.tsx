import { useEffect, useState, useMemo } from 'react';

import { UserVerifyTokenSchema } from '@trastocker/validation-schema-definition';
import { useMutation } from 'urql';
import * as v from 'valibot';

import { verifyUserMutation } from './gql';

import type { VerifyUserMutation, VerifyUserMutationVariables } from './gql';

export type UseIsVerifyTokenProps = {
  verifyToken: string;
};

export const useIsVerifyUser = ({ verifyToken }: UseIsVerifyTokenProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [result, verify] = useMutation<VerifyUserMutation, VerifyUserMutationVariables>(verifyUserMutation);

  useEffect(() => {
    if (!v.safeParse(UserVerifyTokenSchema, verifyToken).success) {
      setIsLoading(false);
      return;
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      await verify({ verifyToken });
      setIsLoading(false);
    })();
  }, [verifyToken, verify]);

  const isVerified = useMemo(() => {
    return !!result.data?.verifyUser;
  }, [result]);

  return {
    isVerified,
    isLoading,
  };
};
