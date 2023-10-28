import "dotenv/config";
import { config } from "@keystone-6/core";

import { lists } from "./src/schema";

import { withAuth, session } from "./auth";

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
    lists,
    ui: {
      /* Everyone who is signed in can access the Admin UI */
      isAccessAllowed: ({ session }) => {
        console.log(session);
        return !!session;
      },
    },
    session,
  })
);
