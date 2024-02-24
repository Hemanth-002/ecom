import styled from "styled-components";
import { Step } from "./StepstoStart";

export const Wrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
  padding: 0.5rem;
  justify-content: space-between;
  border: 2px solid #a9a9a942;
  border-radius: 4px;
  img {
    width: 7rem;
    height: 7rem;
    object-fit: contain;
  }
`;

export const SubWrapper = styled.div`
  display: flex;
  font-size: 14px;
  flex-direction: row;
`;
export const Quantity = styled(Step)`
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
`;

export const Name = styled.p`
  margin: 0;
  font-size: 1.5rem;
  span {
    font-size: 1rem;
    color: gray;
  }
`;

export const Description = styled.p`
  margin: 0;
  font-size: 1rem;
  color: gray;
`;

export const SubName = styled.p`
  margin: 0;
  font-size: 1rem;
  span {
    font-size: 1rem;
    color: gray;
  }
`;

const CartItem = ({ item }) => {
  if (!item) return null;
  return (
    <Wrapper>
      <div>
        <Name>{item?.name}</Name>
        <Description>{item?.description}</Description>
        <SubName>
          ₹{item?.price}* {item?.quantity} = ₹
          {item?.price * item?.quantity}
        </SubName>
      </div>
      <SubWrapper>
        {item?.quantity ? (
          <>
            Quantity:
            {/* <Quantity>➕</Quantity> */}
            <Quantity>{item.quantity}</Quantity>
            {/* <Quantity>➖</Quantity> */}
          </>
        ) : null}
        <img src={item.image} />
      </SubWrapper>
    </Wrapper>
  );
};

export default CartItem;
