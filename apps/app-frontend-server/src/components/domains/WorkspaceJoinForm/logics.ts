import { useCallback, useMemo } from 'react';

import { valibotResolver } from '@hookform/resolvers/valibot';
import { WorkspaceInviteCodeSchema } from '@trastocker/validation-schema-definition';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from 'urql';
import * as v from 'valibot';

import { joinWorkspaceMutation } from './gql';

import type { JoinWorkspaceMutation, JoinWorkspaceMutationVariables } from './gql';

import { useTranslation } from '@hooks/useTranslation';

const schema = v.object({
  inviteCode: WorkspaceInviteCodeSchema,
});

type WorkspaceJoinFormValues = {
  inviteCode: string;
};

export const useWorkspaceJoinForm = () => {
  const { t } = useTranslation();
  const methods = useForm<WorkspaceJoinFormValues>({
    resolver: valibotResolver(schema),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, joinWorkspace] = useMutation<JoinWorkspaceMutation, JoinWorkspaceMutationVariables>(joinWorkspaceMutation);

  const canSubmit = useMemo(() => {
    if (methods.formState.isLoading) return false;
    if (methods.formState.isSubmitting) return false;
    if (methods.formState.isSubmitSuccessful) return false;
    return methods.formState.isValid;
  }, [methods.formState]);

  const handleSubmit = useCallback(async (data: WorkspaceJoinFormValues) => {
    const result = await joinWorkspace(data);

    if (result.error) {
      toast.error(t('Failed to join workspace'));
      return;
    }

    // TODO: redirect to logined page
  }, [joinWorkspace, t]);

  return {
    canSubmit,
    methods,
    handleSubmit: methods.handleSubmit(handleSubmit),
  };
};
