import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, select, text } from "@keystone-6/core/fields";

export const Product = list({
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
    order: integer(),
    description: text({
      ui: {
        displayMode: "textarea",
      },
    }),
    status: select({
      options: [
        { label: "Draft", value: "draft" },
        { label: "Available", value: "available" },
        { label: "Unavailable", value: "unavailable" },
      ],
      defaultValue: "draft",
      ui: {
        displayMode: "segmented-control",
      },
    }),
    image: relationship({
      ref: "Image.product",
      ui: {
        displayMode: "cards",
        cardFields: ["image", "altText"],
        inlineCreate: { fields: ["image", "altText", "name"] },
        inlineEdit: { fields: ["image", "altText"] },
      },
    }),
    price: integer(),
  },
});
