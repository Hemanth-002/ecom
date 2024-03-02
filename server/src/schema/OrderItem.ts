import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, text } from "@keystone-6/core/fields";

export const OrderItem = list({
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
    description: text({ ui: { displayMode: "textarea" } }),
    image: relationship({
      ref: "Image",
      ui: {
        displayMode: "cards",
        cardFields: ["image", "altText"],
        inlineCreate: { fields: ["image", "altText", "name"] },
        inlineEdit: { fields: ["image", "altText"] },
        inlineConnect: true,
      },
    }),
    price: integer(),
    quantity: integer(),
    order: relationship({ ref: "Order.items" }),
  },
});
