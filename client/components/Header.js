import Link from "next/link";

import styled from "styled-components";
import Navbar from "./Navbar";

const Logo = styled.h1`
  font-size: 1.5rem;
  position: relative;
  z-index: 2;
  a {
    color: #333;
    text-decoration: none;
    padding: 0.5rem 1rem;
    :hover {
      text-decoration: none;
    }
  }
`;

const StyledHeader = styled.header`
  .bar {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    align-items: center;
  }
  .sub-bar {
    display: grid;
    grid-template-columns: auto 1fr;
    border-bottom: 1px solid black;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <div className="bar">
        <Logo>
          <Link href="/">Shopee</Link>
        </Logo>
        <Navbar />
      </div>
      {/* <div className="sub-bar">
        <p>Search</p>
      </div> */}
    </StyledHeader>
  );
};

export default Header;
