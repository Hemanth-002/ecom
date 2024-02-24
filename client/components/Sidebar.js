import React from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import CartItem from "./CartItem";
import { getTotalCost } from "../utils";
import { MyUser } from "../context/user";
import { GET_CART } from "../graphql/queries/cart";

const Drawer = styled.div`
  display: ${({ open }) => (!open ? "none" : "flex")};
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;
  width: 33rem;
  height: 100%;
  background-color: #f6f6f6;
  position: fixed;
  top: 0;
  right: ${({ open }) => (open ? "0" : "-250px")};
  transition: left 0.3s ease-in-out;
  padding: 20px;
  overflow-y: scroll;
`;

const FilterButton = styled.button`
  background-color: #555;
  color: #fff;
  padding: 15px 20px;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const CartGroup = styled.div``;

const Sidebar = ({ isOpen, setIsOpen }) => {
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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const totalPrice = getTotalCost(cartsData || []);

  if (!userId) return null;

  return (
    <>
      <div style={{ display: "flex" }}>
        <FilterButton onClick={toggleSidebar}>Open Cart</FilterButton>
      </div>
      <Drawer open={isOpen}>
        <div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <h3>Your Shopee Cart</h3>
            <IoMdClose size={30} onClick={() => setIsOpen(false)} />
          </div>
          <CartGroup>
            {cartsData?.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </CartGroup>
        </div>
        <Footer>
          <h4> TotalPrice: ₹{totalPrice}</h4>
        </Footer>
      </Drawer>
    </>
  );
};

export default Sidebar;
