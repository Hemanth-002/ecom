import Pagination from "../components/Pagination";
import Products from "../components/Products";

const products = () => {
  return (
    <div>
      <Pagination page={1} />
      <Products />
      <Pagination page={1} />
    </div>
  );
};

export default products;
