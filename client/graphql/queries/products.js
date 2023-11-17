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


export const CREATE_PRODUCT = gql`
   mutation CREATE_PRODUCT($data: ProductCreateInput!) {
   createProduct(data: $data) {
    id
    description
    name
    price
    status
  }
}
`