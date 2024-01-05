import React, { useState } from "react";
import styled from "styled-components";
import { useUser } from "../hooks/useUser";
import CartItem from "./CartItem";
import { getTotalCost } from "../utils";

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
  background-color: #3498db;
  color: #fff;
  padding: 10px;
  border: none;
  cursor: pointer;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const CartGroup = styled.div``;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = useUser();

  if (!user) return null;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const totalPrice = getTotalCost(user?.cart || []);
  return (
    <>
      <FilterButton onClick={toggleSidebar}>Open Cart</FilterButton>
      <Drawer open={isOpen}>
        <div>
          <h3>Your Shopee Cart</h3>
          <CartGroup>
            {user?.cart?.map((item) => (
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
