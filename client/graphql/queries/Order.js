import { gql } from "@apollo/client";

export const GET_ORDER = gql`
  query Orders($where: UserWhereUniqueInput!) {
    user(where: $where) {
      orders {
        id
        totalAmount
        items {
          id
          name
          price
          quantity
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
`;
