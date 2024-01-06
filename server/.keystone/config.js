"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_config = require("dotenv/config");
var import_core5 = require("@keystone-6/core");

// src/schema/User.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var User = (0, import_core.list)({
  access: import_access.allowAll,
  fields: {
    name: (0, import_fields.text)({ validation: { isRequired: true } }),
    email: (0, import_fields.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    password: (0, import_fields.password)({ validation: { isRequired: true } }),
    //posts: relationship({ ref: 'Post.author', many: true }),
    cart: (0, import_fields.relationship)({
      ref: "Cart.user",
      many: true,
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" }
      }
    }),
    createdAt: (0, import_fields.timestamp)({
      defaultValue: { kind: "now" }
    })
  }
});

// src/schema/Product.ts
var import_core2 = require("@keystone-6/core");
var import_access2 = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");
var Product = (0, import_core2.list)({
  access: import_access2.allowAll,
  fields: {
    name: (0, import_fields2.text)({ validation: { isRequired: true } }),
    description: (0, import_fields2.text)({
      ui: {
        displayMode: "textarea"
      }
    }),
    status: (0, import_fields2.select)({
      options: [
        { label: "Draft", value: "draft" },
        { label: "Available", value: "available" },
        { label: "Unavailable", value: "unavailable" }
      ],
      defaultValue: "draft",
      ui: {
        displayMode: "segmented-control"
      }
    }),
    image: (0, import_fields2.relationship)({
      ref: "Image.product",
      ui: {
        displayMode: "cards",
        cardFields: ["image", "altText"],
        inlineCreate: { fields: ["image", "altText", "name"] },
        inlineEdit: { fields: ["image", "altText"] }
      }
    }),
    price: (0, import_fields2.integer)()
  }
});

// src/schema/Image.ts
var import_cloudinary = require("@keystone-6/cloudinary");
var import_core3 = require("@keystone-6/core");
var import_access3 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var cloudinary = {
  cloudName: process.env.CLOUDINARY_NAME || "",
  apiKey: process.env.CLOUDINARY_API_KEY || "",
  apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  folder: "shopee"
};
var Image = (0, import_core3.list)({
  access: import_access3.allowAll,
  fields: {
    name: (0, import_fields3.text)({ validation: { isRequired: true } }),
    image: (0, import_cloudinary.cloudinaryImage)({
      cloudinary
    }),
    altText: (0, import_fields3.text)(),
    product: (0, import_fields3.relationship)({
      ref: "Product.image"
    })
  }
});

// src/schema/Cart.ts
var import_core4 = require("@keystone-6/core");
var import_access4 = require("@keystone-6/core/access");
var import_fields4 = require("@keystone-6/core/fields");
var Cart = (0, import_core4.list)({
  access: import_access4.allowAll,
  fields: {
    product: (0, import_fields4.relationship)({ ref: "Product" }),
    user: (0, import_fields4.relationship)({
      ref: "User.cart"
    }),
    quantity: (0, import_fields4.integer)({
      defaultValue: 1,
      validation: { isRequired: true }
    })
  }
});

// src/schema.ts
var lists = {
  User,
  Product,
  Image,
  Cart
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");

// lib/mail.ts
var import_nodemailer = require("nodemailer");
var transporter = (0, import_nodemailer.createTransport)({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
});
var emailTemplate = (text4) => {
  return `
        <div style="
        border:1px solid black
        padding:20px
        font-family:sans-serif 
        ">
        <h2> Hello There!!</h2>
        <p>${text4}</p>
        </div>
        `;
};
var sendPasswordResetEmail = async (token, to) => {
  const emailData = await transporter.sendMail({
    to,
    from: "admin@shopee.com",
    subject: "Password Rest Token",
    html: emailTemplate(`Password Reset Token is here!
    <a href="${process.env.CLIENT_URL}/reset?token=${token}">Click here to Reset</a>`)
  });
  console.log(emailData);
};

// auth.ts
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "name createdAt",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"]
  },
  passwordResetLink: {
    async sendToken({ identity, token }) {
      await sendPasswordResetEmail(token, identity);
    }
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// mutations/index.ts
var import_schema = require("@graphql-tools/schema");

// mutations/addToCart.ts
var addToCart = async (root, { productID }, context) => {
  const sess = context.session;
  if (!sess?.itemId) {
    throw new Error("You Must be logged in ...");
  }
  const allCartItems = await context.query.cart.findMany({
    where: { user: { id: sess.itemId }, product: { id: productID } }
  });
  console.log(allCartItems);
};
var addToCart_default = addToCart;

// mutations/index.ts
var graphql = String.raw;
var extendGraphQLSchema = (baseSchema) => {
  return (0, import_schema.mergeSchemas)({
    schemas: [baseSchema],
    typeDefs: graphql`
      type Mutation {
        addToCart(productID: ID!): Cart
      }
    `,
    resolvers: {
      Mutation: {
        addToCart: addToCart_default
      }
    }
  });
};

// keystone.ts
var databaseURL = process.env.DATABASE_URL || "mongodb://localhost/shopee";
var keystone_default = withAuth(
  (0, import_core5.config)({
    server: {
      cors: {
        origin: [process.env.CLIENT_URL],
        credentials: true
      }
    },
    db: {
      provider: "postgresql",
      url: databaseURL
    },
    ui: {
      /* Everyone who is signed in can access the Admin UI */
      isAccessAllowed: ({ session: session2 }) => {
        return !!session2;
      }
    },
    lists,
    extendGraphqlSchema: extendGraphQLSchema,
    session
  })
);
//# sourceMappingURL=config.js.map
