import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GET_PRODUCTS {
    products {
      id
      name
      price
      status
      description
      image {
        image {
          publicUrl
        }
        altText
      }
    }
  }
`;
