import React from "react";
import Head from "next/head";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import Page from "../components/Page";

const uploadLink = createUploadLink({
  uri: process.env.SERVER_URL,
  fetchOptions: {
    mode: "cors",
  },
  headers: {
    "Access-Control-Allow-Origin": "*",
    "apollo-require-preflight": true,
  },
});

const MyApp = ({ Component, pageProps }) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: uploadLink,
    // uri: process.env.SERVER_URL,
  });

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ApolloProvider client={client}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    </>
  );
};

export default MyApp;
