import dotenv from "dotenv";
dotenv.config();

import { config } from "@keystone-6/core";

import { lists } from "./src/schema";

import { withAuth, session } from "./auth";
import { extendGraphQLSchema } from "./mutations";

const databaseURL = process.env.DATABASE_URL || "mongodb://localhost/shopee";

// const clientUrl = process.env.CLIENT_URL || "http://localhost:4000/";
// console.log(process.env.CLIENT_URL);


export default withAuth(
  config({
    server: {
      healthCheck: true,
      cors: {
        origin: "*",
      },
      maxFileSize: 10 * 1024 ** 2,
    },
    db: {
      provider: "postgresql",
      url: databaseURL,
    },
    ui: {
      /* Everyone who is signed in can access the Admin UI */
      isAccessAllowed: ({ session }) => {
        return !!session;
      },
    },
    lists,
    extendGraphqlSchema: extendGraphQLSchema,
    session,
  })
);
