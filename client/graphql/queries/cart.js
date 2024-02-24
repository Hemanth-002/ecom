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
        description
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

export const ADD_TO_CART = gql`
  mutation Mutation($data: CartCreateInput!) {
    createCart(data: $data) {
      user {
        id
      }
      quantity
    }
  }
`;
