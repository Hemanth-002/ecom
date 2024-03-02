import { gql } from "@apollo/client";

export const CHECKOUT = gql`
  mutation CHECKOUT($token: String!, $userId: String!) {
    checkout(token: $token, userId: $userId) {
      id
      charge
    }
  }
`;
