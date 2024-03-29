// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
import { User } from "./schema/User";
import { Product } from "./schema/Product";
import { Image } from "./schema/Image";
import { Cart } from "./schema/Cart";
import { OrderItem } from "./schema/OrderItem";
import { Order } from "./schema/Order";


export const lists = {
  User,
  Product,
  Image,
  Cart,
  OrderItem,
  Order,
};
