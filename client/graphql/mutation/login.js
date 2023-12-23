import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation LogIn($data: UserCreateInput!) {
    createUser(data: $data) {
      email
      id
      name
    }
  }
`;
