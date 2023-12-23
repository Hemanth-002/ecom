import React from "react";
import styled from "styled-components";

const Label = styled.label`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  min-height: 2rem;
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
  border-color: grey;
`;

const Input = ({
  title,
  name,
  placeHolder,
  type,
  required,
  value,
  onChange,
}) => {
  return (
    <Label>
      {title}:
      <StyledInput
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeHolder={placeHolder}
      />
    </Label>
  );
};

export default Input;
