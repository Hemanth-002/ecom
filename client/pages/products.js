import Pagination from "../components/Pagination";
import Products from "../components/Products";
import Sidebar from "../components/Sidebar";

const products = () => {
  return (
    <div>
      <Sidebar />
      <Pagination page={1} />
      <Products />
      <Pagination page={1} />
    </div>
  );
};

export default products;
