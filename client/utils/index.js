export const getTotalCost = (items) => {
  return items?.reduce((acc, curr) => {
    const { product } = curr || {};
    acc += product?.price * curr?.quantity;
    return acc;
  }, 0);
};
