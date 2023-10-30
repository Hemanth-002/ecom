import Link from "next/link";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  font-size: 1rem;
  font-weight: 400;
  margin-right: 2.5rem;
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
  return (
    <Nav>
      <Link href="/products">Products</Link>
      <Link href="/sell">Sell</Link>
      <Link href="/orders">Orders</Link>
      <Link href="/account">Account</Link>
    </Nav>
  );
};

export default Navbar;
