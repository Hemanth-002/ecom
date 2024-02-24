import { useQuery } from "@apollo/client";
import { useState } from "react";
import { PRODUCTS_COUNT, GET_PRODUCTS } from "../graphql/queries/products";
import { GET_CART } from "../graphql/queries/cart";
import Pagination from "../components/Pagination";
import Products from "../components/Products";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";

const products = () => {
  const { loading: productLoading } = useQuery(PRODUCTS_COUNT);
  const { loading: allLoading } = useQuery(GET_PRODUCTS);
  const { loading: cartLoading } = useQuery(GET_CART);

  const [isOpen, setIsOpen] = useState(false);
  if (productLoading || allLoading || cartLoading) return <Spinner />;

  return (
    <div>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div onClick={() => setIsOpen(false)}>
        <Pagination page={1} />
        <Products setIsOpen={setIsOpen} />
        <Pagination page={1} />
      </div>
    </div>
  );
};

export default products;
