import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Page from "../components/Page";

const MyApp = ({ Component, pageProps }) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:3000/api/graphql",
  });

  return (
    <ApolloProvider client={client}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
};

export default MyApp;
