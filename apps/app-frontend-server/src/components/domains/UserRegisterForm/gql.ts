import { gql } from 'urql';

import type { IUser, IMutationRegisterUserArgs } from '@trastocker/graphql-definition';

export const registerUserFragment = gql`
  fragment RegisterUserFragment on User {
    id
    name
    email
  }
`;

export const registerUserMutation = gql`
  mutation registerUser($name: String!, $email: String!, $password: String!) {
    registerUser(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

export type RegisterUserFragment = Pick<IUser, 'id' | 'name' | 'email'>;
export type RegisterUserMutation = {
  registerUser?: RegisterUserFragment;
};
export type RegisterUserMutationVariables = IMutationRegisterUserArgs;
