import React from "react";
import Router from "next/router";
import styled from "styled-components";
import useForm from "../hooks/useForm";
import { CREATE_PRODUCT } from "../graphql/queries/products";
import { useMutation } from "@apollo/client";
import ButtonPrimary from "./ButtonPrimary";

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

const CreateProduct = () => {
  const { inputs, handleChange } = useForm({
    image: null,
    name: "new product",
    description: "",
    price: 123,
  });

  const [createProduct, { data, loading }] = useMutation(CREATE_PRODUCT, {
    variables: {
      data: {
        name: inputs.name,
        description: inputs.description,
        price: inputs.price,
        status: "available",
        image: {
          create: {
            image: inputs.image,
            name: inputs.name,
            altText: inputs.name,
          },
        },
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct();
    if (data)
      Router.push({
        pathname: `/products/${data?.createProduct.id}`,
      });
  };

  if (loading) return <LoadingMessage>Loading...</LoadingMessage>;

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

      <FormLabel htmlFor="image">Image:</FormLabel>
      <Input
        type="file"
        required
        name="image"
        placeholder="Image"
        onChange={handleChange}
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

      <ButtonPrimary type="submit" text={"Add Product"} />
    </FormContainer>
  );
};

export default CreateProduct;
