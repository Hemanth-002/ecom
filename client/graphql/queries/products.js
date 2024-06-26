import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GET_PRODUCTS(
    $orderBy: [ProductOrderByInput!]!
    $take: Int
    $skip: Int!
  ) {
    products(orderBy: $orderBy, take: $take, skip: $skip) {
      id
      name
      price
      status
      order
      description
      image {
        url
        image {
          publicUrl
        }
        altText
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GET_PRODUCT($where: ProductWhereUniqueInput!) {
    product(where: $where) {
      id
      name
      price
      status
      description
      image {
        url
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
`;

export const UPDATE_PRODUCT = gql`
  mutation UPDATE_PRODUCT(
    $where: ProductWhereUniqueInput!
    $data: ProductUpdateInput!
  ) {
    updateProduct(where: $where, data: $data) {
      id
      description
      name
      price
      status
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DELETE_PRODUCT($where: ProductWhereUniqueInput!) {
    deleteProduct(where: $where) {
      name
    }
  }
`;

export const PRODUCTS_COUNT = gql`
  query PRODUCTS_COUNT {
    productsCount
  }
`;
