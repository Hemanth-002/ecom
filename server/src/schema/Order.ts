import { graphql, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, text, virtual } from "@keystone-6/core/fields";

export const Order = list({
  access: allowAll,
  fields: {
    label: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve(item: any) {
          return `Cool Hem ${item.total}`;
        },
      }),
    }),
    totalAmount: integer(),
    items: relationship({ ref: "OrderItem.order", many: true }),
    user: relationship({ ref: "User.orders" }),
    charge: text(),
  },
});
