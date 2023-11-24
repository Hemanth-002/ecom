import { useQuery } from "@apollo/client";
import Router, { useRouter } from "next/router";
import styled from "styled-components";
import { GET_PRODUCT } from "../../graphql/queries/individualProduct";
import { Pricetag, ProductImage } from "../../components/Product";
import { CardTitle } from "../../components/FeatureCard";
import { SubHeader } from "../../components/HeroWrapper";
import ButtonPrimary from "../../components/ButtonPrimary";

const Product = styled.div`
  display: flex;
`;

const ProductDetails = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

const IndividualProduct = () => {
  const router = useRouter();
  const { id: productId } = router?.query;

  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      where: { id: productId },
    },
  });

  const { image, name, price, description } = data?.product || {};

  const handleNext = () => {
    Router.push({
      pathname: `/update`,
      query: {
        id: productId,
      },
    });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Product>
      <ProductImage src={image?.image?.publicUrl}></ProductImage>
      <ProductDetails>
        <CardTitle>{name}</CardTitle>
        <Pricetag>₹{price}</Pricetag>
        <SubHeader>{description}</SubHeader>
        <ButtonPrimary text={"Add to Cart"} />
        <ButtonPrimary text={"Edit"} handleClick={handleNext} />
      </ProductDetails>
    </Product>
  );
};

export default IndividualProduct;
