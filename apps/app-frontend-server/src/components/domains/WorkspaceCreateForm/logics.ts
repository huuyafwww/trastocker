import { useCallback } from 'react';

import { valibotResolver } from '@hookform/resolvers/valibot';
import { WorkspaceNameSchema } from '@trastocker/validation-schema-definition';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from 'urql';
import * as v from 'valibot';

import { createWorkspaceMutation } from './gql';

import type { CreateWorkspaceMutation, CreateWorkspaceMutationVariables } from './gql';

import { useTranslation } from '@hooks/useTranslation';

const schema = v.object({
  name: WorkspaceNameSchema,
});

type WorkspaceCreateFormValues = {
  name: string;
};

export const useWorkspaceCreateForm = () => {
  const { t } = useTranslation();
  const methods = useForm<WorkspaceCreateFormValues>({
    resolver: valibotResolver(schema),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, createWorkspace] = useMutation<CreateWorkspaceMutation, CreateWorkspaceMutationVariables>(createWorkspaceMutation);

  const handleSubmit = useCallback(async (data: WorkspaceCreateFormValues) => {
    const result = await createWorkspace(data);

    if (result.error) {
      toast.error(t('Login failed'));
      return;
    }

    // TODO: redirect to logined page
  }, [createWorkspace, t]);

  return {
    methods,
    handleSubmit: methods.handleSubmit(handleSubmit),
  };
};
