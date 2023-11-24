import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: fit-content;
  height: fit-content;
  background-color: #555;
  border-color: #333;
  border-width: 0px;
  margin: 0;
  padding: 0.75rem 1.625rem 0.75rem 1.625rem;
  border-radius: 2.875rem;
  color: #eee;
  letter-spacing: 1px;
  line-height: 1.5rem;
  cursor: pointer;
`;

const ButtonPrimary = ({ text , handleClick}) => {
  return <Button onClick={handleClick}>{text}</Button>;
};

export default ButtonPrimary;
