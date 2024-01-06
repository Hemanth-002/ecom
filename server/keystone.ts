import "dotenv/config";
import { config } from "@keystone-6/core";

import { lists } from "./src/schema";

import { withAuth, session } from "./auth";
import { extendGraphQLSchema } from "./mutations";

const databaseURL = process.env.DATABASE_URL || "mongodb://localhost/shopee";

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.CLIENT_URL],
        credentials: true,
      },
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
