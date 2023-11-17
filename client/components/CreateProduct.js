import React from "react";
import Router from "next/router";
import useForm from "../hooks/useForm";
import { CREATE_PRODUCT } from "../graphql/queries/products";
import { useMutation } from "@apollo/client";

const CreateProduct = () => {
  const { inputs, handleChange } = useForm({
    image: null, // Initialize image as null
    name: "new product",
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

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="description">
        Name:
        <input
          type="text"
          name="name"
          placeholder="name"
          value={inputs.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="description">
        Description:
        <input
          type="text"
          name="description"
          placeholder="description"
          value={inputs.description}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="image">
        Image:
        <input
          type="file"
          name="image"
          placeholder="image"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="price">
        Price:
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={inputs.price}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateProduct;
