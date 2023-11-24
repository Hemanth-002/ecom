import { useMutation, useQuery } from "@apollo/client";
import Router, { useRouter } from "next/router";
import styled from "styled-components";
import { GET_PRODUCT } from "../../graphql/queries/individualProduct";
import { Pricetag, ProductImage } from "../../components/Product";
import { CardTitle } from "../../components/FeatureCard";
import { SubHeader } from "../../components/HeroWrapper";
import ButtonPrimary from "../../components/ButtonPrimary";
import { DELETE_PRODUCT } from "../../graphql/queries/products";

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

  const [deleteProduct, { loading: delLoading, error: delError }] = useMutation(
    DELETE_PRODUCT,
    {
      variables: {
        where: {
          id: productId,
        },
      },
    }
  );

  const { image, name, price, description } = data?.product || {};

  const handleNext = () => {
    Router.push({
      pathname: `/update`,
      query: {
        id: productId,
      },
    });
  };

  const handleDelete = () => {
    if (confirm("Do you really wanna Delete")) {
      deleteProduct().catch((err) => alert(err.message));
      Router.push({ pathname: `/products` });
    }
    return;
  };

  if (loading || delLoading) return <p>Loading...</p>;

  return (
    <Product>
      <ProductImage src={image?.image?.publicUrl}></ProductImage>
      <ProductDetails>
        <CardTitle>{name}</CardTitle>
        <Pricetag>₹{price}</Pricetag>
        <SubHeader>{description}</SubHeader>
        <span style={{ display: "flex", gap: "10px" }}>
          <ButtonPrimary text={"Add to Cart"} />
          <ButtonPrimary text={"Edit"} handleClick={handleNext} />
        </span>
        <ButtonPrimary text={"Delete"} handleClick={handleDelete} />
      </ProductDetails>
    </Product>
  );
};

export default IndividualProduct;
