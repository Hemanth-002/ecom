import CreateProduct from "../components/CreateProduct";
import HeroWrapper from "../components/HeroWrapper";
import { SellPageData } from "../constants/constants";

const sell = () => {
  return (
    <>
      <HeroWrapper {...SellPageData} />
      <CreateProduct />
    </>
  );
};

export default sell;
