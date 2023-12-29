import { gql } from "@apollo/client";

export const SIGNIN_MUTATION = gql`
  mutation LogIn($data: UserCreateInput!) {
    createUser(data: $data) {
      email
      id
      name
    }
  }
`;
