import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { useRouter } from "next/router";
import { GET_PRODUCTS } from "../graphql/queries/products";
import Product from "../components/Product";
import { perPage } from "../constants/constants";

export const ProductsList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
`;

const Products = ({ setIsOpen }) => {
  const router = useRouter();
  const page = router?.query?.page || 0;
  const { data } = useQuery(GET_PRODUCTS, {
    variables: {
      take: perPage,
      skip: (page - 1) * perPage > 0 ? (page - 1) * perPage : 0,
    },
  });

  return (
    <div>
      <ProductsList>
        {data?.products?.map((product) => (
          <Product key={product.id} product={product} setIsOpen={setIsOpen} />
        ))}
      </ProductsList>
    </div>
  );
};

export default Products;
