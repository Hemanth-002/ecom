import { gql } from "@apollo/client";

export const SIGNOUT_MUTATION = gql`
  mutation SignOut {
    endSession
  }
`;
