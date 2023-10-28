import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { integer, select, text } from "@keystone-6/core/fields";

export const Product = list({
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
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
    price: integer(),
    // Todo: Photo Relationship Media
  },
});
