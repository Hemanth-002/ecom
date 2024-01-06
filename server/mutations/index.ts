import { mergeSchemas } from "@graphql-tools/schema";
import type { GraphQLSchema } from "graphql";
import addToCart from "./addToCart";

const graphql = String.raw;

export const extendGraphQLSchema = (baseSchema: GraphQLSchema) => {
  return mergeSchemas({
    schemas: [baseSchema],
    typeDefs: graphql`
      type Mutation {
        addToCart(productID: ID!): Cart
      }
    `,
    resolvers: {
      Mutation: {
        addToCart,
      },
    },
  });
};
