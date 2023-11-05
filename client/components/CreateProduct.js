import React from "react";
import useForm from "../hooks/useForm";
import { CREATE_PRODUCT } from "../graphql/queries/products";
import { useMutation } from "@apollo/client";

const CreateProduct = () => {
  const { inputs, handleChange } = useForm();

  const [createProduct] = useMutation(CREATE_PRODUCT);

  const handleSubmit = () => {
    (e) => {
      e.preventDefault();
      console.log(inputs);
      createProduct({
        variables: {
          data: {
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
            status: "AVAILABLE",
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
    };
  };

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
          value={inputs.image}
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
