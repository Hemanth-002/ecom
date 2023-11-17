import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query Product($where: ProductWhereUniqueInput!) {
    product(where: $where) {
      description
      image {
        name
        image {
          publicUrl
        }
        altText
      }
      name
      price
      status
    }
  }
`;
