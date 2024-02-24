import { gql } from "@apollo/client";

export const GET_CART = gql`
  query GET_CART($where: CartWhereInput!) {
    carts(where: $where) {
      id
      quantity
      product {
        name
        price
        status
        image {
        name
        image {
          publicUrl
        }
      }
      }
    }
  }
`;
