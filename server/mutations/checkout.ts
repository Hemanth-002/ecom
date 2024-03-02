import { KeystoneContext } from "@keystone-6/core/types";
import Stripe from "stripe";
// import stripeConfig from "../lib/stripe";

const graphql = String.raw;

const checkout = async (
  root: any,
  { token, userId }: { token: string; userId: string },
  context: KeystoneContext
): Promise<any> => {
  if (!userId) {
    throw new Error("You Must be logged in ...");
  }
  const stripeConfig = new Stripe(process.env.STRIPE_SECRET || "");

  const user = await context.query.User.findOne({
    where: { id: userId },
    query: graphql`
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
            id
            image {
            publicUrl
            }
         }
        }
    }
    `,
  });

  const cartItems = user.cart.filter(
    (cartItem: { product: any }) => cartItem.product
  );

  const totalAmount = cartItems.reduce((total: number, cartItem: any) => {
    return total + cartItem.quantity * cartItem.product.price;
  }, 0);

  const charge: any = await stripeConfig.paymentIntents
    .create({
      amount: totalAmount,
      currency: "INR",
      confirm: true,
      payment_method_data: {
        type: "card",
        card: {
          token: token,
        },
      },
      return_url: "https://yourwebsite.com/success",
    } as any)
    .catch((err) => {
      console.log(err.message);
    });

  console.log(charge, token);

  try {
    const orderItems = cartItems.map((cartItem: any) => ({
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      image: { connect: { id: cartItem.product.image.id } },
    }));

    console.dir(cartItems, { depth: null });

    console.dir(orderItems, { depth: null });

    // Create order
    const order = await context.db.Order.createOne({
      data: {
        totalAmount: charge.amount,
        charge: charge.id,
        items: { create: orderItems },
        user: { connect: { id: userId } },
      },
    });

    console.log({ order });

    // Clean Cart

    const cartItemIds = cartItems.map((cartItem: any) => ({
      id: cartItem.id,
    }));

    console.log(cartItemIds);

    await context.query.Cart.deleteMany({
      where: cartItemIds,
    });

    return order;
  } catch (error: any) {
    console.log(error.message);
  }
  return null;
};

export default checkout;
