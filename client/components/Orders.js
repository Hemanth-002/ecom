import React from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import CartItem, { SubWrapper } from "./CartItem";
import { MyUser } from "../context/user";
import { GET_ORDER } from "../graphql/queries/Order";

const Footer = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
`;

const CartGroup = styled.div``;

const Orders = () => {
  const { user: userId } = MyUser();

  const { data } = useQuery(GET_ORDER, {
    variables: {
      where: {
        id: userId,
      },
    },
  });

  const cartsData = data?.user?.orders?.map((cartItem) => {
    return {
      id: cartItem.id,
      totalAmount: cartItem.totalAmount,
      items: cartItem?.items?.map((e) => ({
        name: e?.name,
        price: e?.price,
        description: e?.description,
        quantity: e?.quantity,
        image: e?.image?.url || e?.image?.image?.publicUrl || "",
      })),
    };
  });

  if (!userId) return null;

  if (!cartsData || cartsData.length === 0)
    return <p>You don't have any previous Orders</p>;

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
          <h3>Your Orders</h3>
        </div>
      </div>
      <CartGroup>
        {cartsData?.map((item) => (
          <>
            <SubWrapper>Order Id : {item.id}</SubWrapper>
            {item?.items?.map((product) => (
              <CartItem item={product} key={product.id} orderType={true} />
            ))}
            <Footer>
              <h4> TotalPrice: ₹{item.totalAmount}</h4>
            </Footer>
          </>
        ))}
      </CartGroup>
    </>
  );
};

export default Orders;
