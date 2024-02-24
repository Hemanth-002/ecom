import styled from "styled-components";
import Router from "next/router";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CardTitle } from "./FeatureCard";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px 20px;
  max-width: 16rem;
`;

export const Pricetag = styled.span``;

export const ProductImage = styled.img`
  height: 20rem;
  width: 20rem;
  object-fit: contain;
`;

export const Description = styled.p`
  font-size: 0.9rem;
  height: 3rem;
  margin:0.5rem 0.5rem 1rem 0.5rem;
  max-width: fit-content;
  text-overflow: ellipsis;
`;

export const CartCard = styled.div`
  display: flex;
  width: 100%;
  border-radius: 8px;
  color: white;
  background: #555;
  border: 1px solid black;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Product = ({ product }) => {
  const handleRoute = () => {
    Router.push({
      pathname: `/products/${product?.id}`,
    });
  };

  const truncatedDescription =
    product.description.length > 70
      ? `${product.description.substring(0, 70)}...`
      : product.description;
  return (
    <Card>
      <ProductImage src={product?.image?.image?.publicUrl} />
      <CardTitle className="product-buldle" onClick={handleRoute}>
        {product.name}
      </CardTitle>
      <Description>{truncatedDescription}</Description>
      <CartCard>
        <Pricetag>₹{product.price}</Pricetag>
        <AiOutlineShoppingCart size={35} style={{ cursor: "pointer" }} />
      </CartCard>
    </Card>
  );
};

export default Product;
