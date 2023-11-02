import React from "react";
import styled from "styled-components";
import { Section2 } from "./Features";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffffff;
  height: auto;
  row-gap: 6px;
  min-height: 20px;
  padding: 2.625rem 1.5rem 2.625rem 1.5rem;
  width: 33.3%;
`;

export const Logo = styled.img`
  height: 5rem;
  width: 5rem;
  object-fit: contain;
`;

export const CardTitle = styled.h2`
  font-size: 1.562rem;
  margin: 0;
  font-weight: 600;
`;

export const FeatureCard = ({ imgUrl, title, desctiption }) => {
  return (
    <Card bg={"#ffffffff"}>
      <Logo src={imgUrl} />
      <CardTitle>{title}</CardTitle>
      <Section2 style={{ textAlign: "center" }}>{desctiption}</Section2>
    </Card>
  );
};
