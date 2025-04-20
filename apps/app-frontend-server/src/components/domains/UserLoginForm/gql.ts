import { gql } from 'urql';

import type { IMutation, IMutationLoginUserArgs } from '@trastocker/graphql-definition';

export const loginUserMutation = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

export type LoginUserMutation = {
  loginUser: IMutation['loginUser'];
};
export type LoginUserMutationVariables = IMutationLoginUserArgs;
