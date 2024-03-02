import React from "react";
import { useQuery } from "@apollo/client";
import CartCheckout from "../components/CartCheckout";
import { GET_CART } from "../graphql/queries/cart";
import Spinner from "../components/Spinner";

const Checkout = () => {
  const { loading: cartLoading } = useQuery(GET_CART);
  if (cartLoading) return <Spinner />;

  return <CartCheckout />;
};

export default Checkout;
