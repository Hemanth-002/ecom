import Link from "next/link";
import styled from "styled-components";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import Login from "./Login";
import LogOut from "./LogOut";
import { MyUser } from "../context/user";

const Nav = styled.nav`
  display: flex;
  font-size: 1rem;
  font-weight: 400;
  margin-right: 2.5rem;
  cursor: pointer;
  justify-content: flex-end;
  gap: 3rem;
  a {
    color: #333;
    text-decoration: none;
    :hover {
      text-decoration: none;
    }
  }
`;

const Navbar = () => {
  const { user, setUser } = MyUser();
  const [isUserValid, setIsUserValid] = useState(user);

  useEffect(() => {
    // Check authentication status after component mounts on the client side
    const userId = getCookie("userId");
    setIsUserValid(user || userId);
    setUser(user || userId);
  }, [user]);

  return (
    <Nav>
      <Link href="/products">Products</Link>
      {!isUserValid && <Login />}
      {isUserValid && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <LogOut />
        </>
      )}
    </Nav>
  );
};

export default Navbar;
