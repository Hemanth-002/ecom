import { gql } from "@apollo/client";

export const REQUEST_RESET = gql`
  mutation Mutation($email: String!) {
    sendUserPasswordResetLink(email: $email)
  }
`;

export const CHECK_RESET_TOKEN = gql`
  mutation RedeemUserPasswordResetToken(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;
