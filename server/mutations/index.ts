import { mergeSchemas } from "@graphql-tools/schema";
import type { GraphQLSchema } from "graphql";
import addToCart from "./addToCart";
import checkout from "./checkout";

const graphql = String.raw;

export const extendGraphQLSchema = (baseSchema: GraphQLSchema) => {
  return mergeSchemas({
    schemas: [baseSchema],
    typeDefs: graphql`
      type Mutation {
        addToCart(productID: ID!): Cart
        checkout(token: String!, userId: String!): Order
      }
    `,
    resolvers: {
      Mutation: {
        addToCart,
        checkout,
      },
    },
  });
};
