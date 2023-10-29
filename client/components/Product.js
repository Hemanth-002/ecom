import styled from "styled-components";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  max-width: 400px;
`;

export const Pricetag = styled.span``

export const ProductImage = styled.img`
  height: 20rem;
  width: 20rem;
`;

const Product = ({ product }) => {
  return (
    <Card>
      <ProductImage src={product?.image?.image?.publicUrl} />
      {product.name}
      {product.description}
      <Pricetag>{product.price}</Pricetag>
    </Card>
  );
};

export default Product;
