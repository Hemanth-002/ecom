import "@fontsource-variable/kumbh-sans";
import "@fontsource/abril-fatface";
import "@fontsource/architects-daughter";
import "@fontsource/cardo";
import "@fontsource/great-vibes";
import "@fontsource/pacifico";
import { MyProvider } from "../context/user";
import Head from "next/head";
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
    margin: 0;
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
      <Head>
        <title>Shopee</title>
      </Head>
      <GlobalStyles />
      <MyProvider>
        <Header />
        <InnerStyles> {children}</InnerStyles>
      </MyProvider>
    </div>
  );
};

export default Page;
