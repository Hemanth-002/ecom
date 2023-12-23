import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { useRouter } from "next/router";
import { GET_PRODUCTS } from "../graphql/queries/products";
import Product from "../components/Product";
import { perPage } from "../constants/constants";

export const ProductsList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem 3rem;
  grid-gap: 50px;
`;

const Products = () => {
  const router = useRouter();
  const page = router?.query?.page || 0;
  const { data, loading } = useQuery(GET_PRODUCTS, {
    variables: {
      take: perPage,
      skip: (page - 1) * perPage > 0 ? (page - 1) * perPage : 0,
    },
  });

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <ProductsList>
        {data?.products?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsList>
    </div>
  );
};

export default Products;