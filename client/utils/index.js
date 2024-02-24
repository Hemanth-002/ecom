export const getTotalCost = (items) => {
  return items?.reduce((acc, curr) => {
    const { quantity, price } = curr || {};
    acc += price * quantity;
    return acc;
  }, 0);
};
