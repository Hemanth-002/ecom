import { cloudinaryImage } from "@keystone-6/cloudinary";
import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text } from "@keystone-6/core/fields";

export const cloudinary = {
  cloudName: process.env.CLOUDINARY_NAME || "",
  apiKey: process.env.CLOUDINARY_API_KEY || "",
  apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  folder: "shopee",
};

export const Image = list({
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
    image: cloudinaryImage({
      cloudinary,
    }),
    altText: text(),
    // Todo: Photo Relationship Media
  },
});
