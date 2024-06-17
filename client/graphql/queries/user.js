import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query User {
    authenticatedItem {
      ... on User {
        id
        email
        name
        # TODO: Query orders , Cart 
        cart {
        id
        quantity
        product {
          name
          price
          description
          image {
            url
            image {
              publicUrl
            }
          }
        }
      }
      }
    }
  }
`;
