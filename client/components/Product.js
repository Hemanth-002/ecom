import styled from "styled-components";
import Router from "next/router";
import { useMutation } from "@apollo/client";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CardTitle } from "./FeatureCard";
import Spinner from "../components/Spinner";
import { ADD_TO_CART, GET_CART } from "../graphql/queries/cart";
import { MyUser } from "../context/user";

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
  margin: 0.5rem 0.5rem 1rem 0.5rem;
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

const Product = ({ product, setIsOpen }) => {
  const { user: userId } = MyUser();

  const handleRoute = () => {
    Router.push({
      pathname: `/products/${product?.id}`,
    });
  };

  const [addtoCart, { loading }] = useMutation(ADD_TO_CART, {
    variables: {
      data: {
        quantity: 1,
        user: {
          connect: {
            id: userId,
          },
        },
        product: {
          connect: {
            id: product.id,
          },
        },
      },
    },
    refetchQueries: [
      {
        query: GET_CART,
        variables: {
          where: {
            user: {
              id: {
                equals: userId,
              },
            },
          },
        },
      },
    ],
  });
  const truncatedDescription =
    product.description.length > 70
      ? `${product.description.substring(0, 70)}...`
      : product.description;

  if (loading) return <Spinner />;
  return (
    <Card>
      <ProductImage src={product?.image?.image?.publicUrl} />
      <CardTitle className="product-buldle" onClick={handleRoute}>
        {product.name}
      </CardTitle>
      <Description>{truncatedDescription}</Description>
      <CartCard>
        <Pricetag>₹{product.price}</Pricetag>
        <AiOutlineShoppingCart
          size={35}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setIsOpen(true);
            addtoCart();
          }}
        />
      </CartCard>
    </Card>
  );
};

export default Product;
