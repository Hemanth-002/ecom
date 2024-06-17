import React, { useEffect } from "react";
import Router, { useRouter } from "next/router";
import styled from "styled-components";
import useForm from "../hooks/useForm";
import { GET_PRODUCT, UPDATE_PRODUCT } from "../graphql/queries/products";
import { useMutation, useQuery } from "@apollo/client";
import ButtonPrimary from "./ButtonPrimary";
import { ProductImage } from "./Product";

const FormContainer = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

const LoadingMessage = styled.p`
  margin-top: 20px;
`;

const UpdateProduct = () => {
  const router = useRouter();
  const { id: productId } = router?.query;
  const { data: productData, loading: productLoading } = useQuery(GET_PRODUCT, {
    variables: {
      where: {
        id: productId,
      },
    },
  });
  const { product } = productData || {};
  const { inputs, setInputs, handleChange } = useForm();

  useEffect(() => {
    setInputs({
      image: product?.image?.url || product?.image?.image?.publicUrl,
      name: product?.name,
      description: product?.description,
      price: product?.price,
    });
  }, [productData]);

  const [updateProduct, { data, loading }] = useMutation(UPDATE_PRODUCT, {
    variables: {
      where: {
        id: productId,
      },
      data: {
        name: inputs.name,
        description: inputs.description,
        price: inputs.price,
        status: "available",
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct();
    if (data)
      Router.push({
        pathname: `/products/${data?.updateProduct.id}`,
      });
  };

  if (loading || productLoading)
    return <LoadingMessage>Loading...</LoadingMessage>;

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormLabel htmlFor="name">Name:</FormLabel>
      <Input
        required
        type="text"
        name="name"
        placeholder="Name"
        value={inputs.name}
        onChange={handleChange}
      />

      <FormLabel htmlFor="description">Description:</FormLabel>
      <Input
        type="text"
        name="description"
        placeholder="Description"
        value={inputs.description}
        onChange={handleChange}
      />
      <ProductImage
        src={product?.image?.url || product?.image?.image?.publicUrl}
        style={{ width: "10rem", height: "10rem" }}
      />
      <FormLabel htmlFor="price">Price:</FormLabel>
      <Input
        type="number"
        name="price"
        required
        placeholder="Price"
        value={inputs.price}
        onChange={handleChange}
      />

      <ButtonPrimary type="submit" text={"Update Product"} />
    </FormContainer>
  );
};

export default UpdateProduct;
