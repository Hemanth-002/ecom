import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation AuthenticateUserWithPassword($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          name
          email
          id
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

export const SIGNIN_MUTATION = gql`
  mutation LogIn($data: UserCreateInput!) {
    createUser(data: $data) {
      email
      id
      name
    }
  }
`;
