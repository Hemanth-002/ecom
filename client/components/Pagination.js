import { useQuery } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import { PRODUCTS_COUNT } from "../graphql/queries/products";
import { perPage } from "../constants/constants";

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const PaginationStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
  padding: 0.5rem 2rem;
  min-width: fit-content;
  border-radius: 0.25rem;
  margin: 2rem;
  border: 2px solid #e1e1e1;
  p {
    margin: 0;
  }
  a {
    text-decoration: none;
  }

  & > * + * {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      padding: 0;
      height: calc(100% + 1rem);
      top: -0.5rem;
      left: -0.5rem;
      border-left: 2px solid #e1e1e1;
    }
  }
`;

const Pagination = () => {
  const { data } = useQuery(PRODUCTS_COUNT);
  const productsCount = data?.productsCount;
  const totalPages = Math.ceil(productsCount / perPage);

  const [page, setPage] = useState(1);


  return (
    <Container>
      <PaginationStyle>
        <Head>
          <title>
            Shopee - Page {page}/{totalPages}{" "}
          </title>
        </Head>
        <Link
          href={page > 1 ? `/products?page=${page - 1}` : "/products"}
          onClick={() => page > 1 && setPage(page - 1)}
        >
          &larr; Prev
        </Link>
        <p>
          Page {page} of {totalPages} pages
        </p>
        <p>
          showing {perPage} out of {productsCount} products
        </p>
        <Link
          href={page < totalPages ? `/products?page=${page + 1}` : "/products"}
          onClick={() => page < totalPages && setPage(page + 1)}
        >
          Next &rarr;
        </Link>
      </PaginationStyle>
    </Container>
  );
};

export default Pagination;
