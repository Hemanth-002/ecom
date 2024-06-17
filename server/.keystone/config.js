"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_dotenv = __toESM(require("dotenv"));
var import_core7 = require("@keystone-6/core");

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
    orders: (0, import_fields.relationship)({ ref: "Order.user", many: true }),
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
    order: (0, import_fields2.integer)(),
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
    url: (0, import_fields3.text)(),
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

// src/schema/OrderItem.ts
var import_core5 = require("@keystone-6/core");
var import_access5 = require("@keystone-6/core/access");
var import_fields5 = require("@keystone-6/core/fields");
var OrderItem = (0, import_core5.list)({
  access: import_access5.allowAll,
  fields: {
    name: (0, import_fields5.text)({ validation: { isRequired: true } }),
    description: (0, import_fields5.text)({ ui: { displayMode: "textarea" } }),
    image: (0, import_fields5.relationship)({
      ref: "Image",
      ui: {
        displayMode: "cards",
        cardFields: ["image", "altText"],
        inlineCreate: { fields: ["image", "altText", "name"] },
        inlineEdit: { fields: ["image", "altText"] },
        inlineConnect: true
      }
    }),
    price: (0, import_fields5.integer)(),
    quantity: (0, import_fields5.integer)(),
    order: (0, import_fields5.relationship)({ ref: "Order.items" })
  }
});

// src/schema/Order.ts
var import_core6 = require("@keystone-6/core");
var import_access6 = require("@keystone-6/core/access");
var import_fields6 = require("@keystone-6/core/fields");
var Order = (0, import_core6.list)({
  access: import_access6.allowAll,
  fields: {
    label: (0, import_fields6.virtual)({
      field: import_core6.graphql.field({
        type: import_core6.graphql.String,
        resolve(item) {
          return `Cool Hem ${item.total}`;
        }
      })
    }),
    totalAmount: (0, import_fields6.integer)(),
    items: (0, import_fields6.relationship)({ ref: "OrderItem.order", many: true }),
    user: (0, import_fields6.relationship)({ ref: "User.orders" }),
    charge: (0, import_fields6.text)()
  }
});

// src/schema.ts
var lists = {
  User,
  Product,
  Image,
  Cart,
  OrderItem,
  Order
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
var emailTemplate = (text6) => {
  return `
        <div style="
        border:1px solid black
        padding:20px
        font-family:sans-serif 
        ">
        <h2> Hello There!!</h2>
        <p>${text6}</p>
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

// mutations/checkout.ts
var import_stripe = __toESM(require("stripe"));
var graphql2 = String.raw;
var checkout = async (root, { token, userId }, context) => {
  if (!userId) {
    throw new Error("You Must be logged in ...");
  }
  const stripeConfig = new import_stripe.default(process.env.STRIPE_SECRET || "");
  const user = await context.query.User.findOne({
    where: { id: userId },
    query: graphql2`
    id
    email
    name
    cart{
        id
        quantity
        product {
        name
        price
        description
        image {
            url
            id
            image {
            publicUrl
            }
         }
        }
    }
    `
  });
  const cartItems = user.cart.filter(
    (cartItem) => cartItem.product
  );
  const totalAmount = cartItems.reduce((total, cartItem) => {
    return total + cartItem.quantity * cartItem.product.price;
  }, 0);
  const charge = await stripeConfig.paymentIntents.create({
    amount: totalAmount,
    currency: "INR",
    confirm: true,
    payment_method_data: {
      type: "card",
      card: {
        token
      }
    },
    return_url: "https://yourwebsite.com/success"
  }).catch((err) => {
    console.log(err.message);
  });
  console.log(charge, token);
  try {
    const orderItems = cartItems.map((cartItem) => ({
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      image: { connect: { id: cartItem.product.image.id } }
    }));
    console.dir(cartItems, { depth: null });
    console.dir(orderItems, { depth: null });
    const order = await context.db.Order.createOne({
      data: {
        totalAmount: charge.amount,
        charge: charge.id,
        items: { create: orderItems },
        user: { connect: { id: userId } }
      }
    });
    console.log({ order });
    const cartItemIds = cartItems.map((cartItem) => ({
      id: cartItem.id
    }));
    console.log(cartItemIds);
    await context.query.Cart.deleteMany({
      where: cartItemIds
    });
    return order;
  } catch (error) {
    console.log(error.message);
  }
  return null;
};
var checkout_default = checkout;

// mutations/index.ts
var graphql3 = String.raw;
var extendGraphQLSchema = (baseSchema) => {
  return (0, import_schema.mergeSchemas)({
    schemas: [baseSchema],
    typeDefs: graphql3`
      type Mutation {
        addToCart(productID: ID!): Cart
        checkout(token: String!, userId: String!): Order
      }
    `,
    resolvers: {
      Mutation: {
        addToCart: addToCart_default,
        checkout: checkout_default
      }
    }
  });
};

// keystone.ts
import_dotenv.default.config();
var databaseURL = process.env.DATABASE_URL || "mongodb://localhost/shopee";
var keystone_default = withAuth(
  (0, import_core7.config)({
    server: {
      healthCheck: true,
      cors: {
        origin: "*"
      },
      maxFileSize: 10 * 1024 ** 2
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
