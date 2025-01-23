import { gql } from 'urql';

import type { IMutation, IMutationJoinWorkspaceArgs } from '@trastocker/graphql-definition';

export const joinWorkspaceMutation = gql`
  mutation joinWorkspace($inviteCode: String!) {
    joinWorkspace(inviteCode: $inviteCode) {
      id
      name
    }
  }
`;

export type JoinWorkspaceMutation = {
  joinWorkspace: IMutation['joinWorkspace'];
};
export type JoinWorkspaceMutationVariables = IMutationJoinWorkspaceArgs;
