import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { GET_PRODUCTS } from "../graphql/queries/products";
import Product from "../components/Product";

export const ProductsList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem 3rem;
  grid-gap: 50px;
`;

const products = () => {
  const { data, loading } = useQuery(GET_PRODUCTS);

  console.log(data);
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

export default products;
