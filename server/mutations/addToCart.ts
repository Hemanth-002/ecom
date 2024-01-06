import { KeystoneContext } from "@keystone-6/core/types";

const addToCart = async (
  root: any,
  { productID }: { productID: String },
  context: KeystoneContext
): Promise<any> => {


  const sess = context.session;
  if (!sess?.itemId) {
    throw new Error("You Must be logged in ...");
  }
  
  const allCartItems = await context.query.cart.findMany({
    where: { user: { id: sess.itemId }, product: { id: productID } },
  });
  console.log(allCartItems);
};

export default addToCart;
