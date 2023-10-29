import React from "react";
import '@fontsource-variable/kumbh-sans'; 
import styled, { createGlobalStyle } from "styled-components";

import Header from "./Header";

const GlobalStyles = createGlobalStyle`

  html {
    --red:#ff0000;
    --black: #393939;
    --grey: #3a3a3a;
    --gray: var(--grey);
    --lightGrey: #e1e1e1;
    --lightGray: var(--lightGrey);
    --offWhite: #ededed;
    --maxWidth: 1200px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0,0.09),
    box-sizing: border-box;
  }

  body {
    font-family: 'Kumbh Sans Variable', sans-serif;
    margin: 1rem 3rem;
    padding: 0;
    font-size: 1.5rem;
    line-height: 2;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  a:hover{
    text-decoration: underline;
  }

  button {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 1rem;
`;

const Page = ({ children }) => {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <InnerStyles> {children}</InnerStyles>
    </div>
  );
};

export default Page;
