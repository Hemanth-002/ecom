import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  password,
  text,
  relationship,
  timestamp,
} from "@keystone-6/core/fields";

export const User = list({
  access: allowAll,

  fields: {
    name: text({ validation: { isRequired: true } }),

    email: text({
      validation: { isRequired: true },
      isIndexed: "unique",
    }),

    password: password({ validation: { isRequired: true } }),
    //posts: relationship({ ref: 'Post.author', many: true }),
    cart: relationship({
      ref: "Cart.user",
      many: true,
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
      },
    }),
    orders: relationship({ ref: "Order.user", many: true }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
});
