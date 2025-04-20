import { gql } from 'urql';

import type { IUser, IMutationVerifyUserArgs } from '@trastocker/graphql-definition';

export const verifyUserFragment = gql`
  fragment VerifyUserFragment on User {
    id
    name
    email
  }
`;

export const verifyUserMutation = gql`
  mutation verifyUser($verifyToken: String!) {
    verifyUser(verifyToken: $verifyToken) {
      id
      name
      email
    }
  }
`;

export type VerifyUserFragment = Pick<IUser, 'id' | 'name' | 'email'>;
export type VerifyUserMutation = {
  verifyUser?: VerifyUserFragment;
};
export type VerifyUserMutationVariables = IMutationVerifyUserArgs;
