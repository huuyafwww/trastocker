import { gql } from 'urql';

import type { IMutation, IMutationCreateWorkspaceArgs } from '@trastocker/graphql-definition';

export const createWorkspaceMutation = gql`
  mutation createWorkspace($name: String!) {
    createWorkspace(name: $name) {
      id
      name
    }
  }
`;

export type CreateWorkspaceMutation = {
  createWorkspace: IMutation['createWorkspace'];
};
export type CreateWorkspaceMutationVariables = IMutationCreateWorkspaceArgs;
