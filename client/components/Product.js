import styled from "styled-components";
import Router from "next/router";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CardTitle } from "./FeatureCard";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  max-width: 300px;
`;

export const Pricetag = styled.span``;

export const ProductImage = styled.img`
  height: 20rem;
  width: 20rem;
  object-fit: contain;
`;

export const Description = styled.p`
  font-size: 1rem;
  height: 3rem;
  margin: 0;
`;

const Product = ({ product }) => {
  const handleRoute = () => {
    Router.push({
      pathname: `/products/${product?.id}`,
    });
  };

  return (
    <Card>
      <ProductImage src={product?.image?.image?.publicUrl} />
      <CardTitle className="product-buldle" onClick={handleRoute}>
        {product.name}
      </CardTitle>
      <Description>{product.description}</Description>
      <Pricetag>₹{product.price}</Pricetag>
      <AiOutlineShoppingCart size={35} />
    </Card>
  );
};

export default Product;
