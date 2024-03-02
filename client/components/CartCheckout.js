import React from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import CartItem from "./CartItem";
import ButtonPrimary from "./ButtonPrimary";
import { getTotalCost } from "../utils";
import { MyUser } from "../context/user";
import { GET_CART } from "../graphql/queries/cart";
import CheckOut from "./CheckOut";

const Footer = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
`;

const CartGroup = styled.div``;

const CartCheckout = () => {
  const { user: userId } = MyUser();

  const { data } = useQuery(GET_CART, {
    variables: {
      where: {
        user: {
          id: {
            equals: userId,
          },
        },
      },
    },
  });

  const cartsData = data?.carts?.map((cartItem) => {
    return {
      id: cartItem.id,
      name: cartItem.product.name,
      price: cartItem.product.price,
      status: cartItem.product.status,
      description: cartItem.product.description,
      image: cartItem.product?.image?.image?.publicUrl,
      quantity: cartItem.quantity,
    };
  });

  const totalPrice = getTotalCost(cartsData || []);

  if (!userId) return null;

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <h3>Your Shopee Cart</h3>
        </div>
        <CartGroup>
          {cartsData?.map((item) => (
            <CartItem item={item} key={item.id} direction="reverse" />
          ))}
        </CartGroup>
      </div>
      <Footer>
        <h4> TotalPrice: ₹{totalPrice}</h4>
      </Footer>
      <CheckOut />
    </>
  );
};

export default CartCheckout;
