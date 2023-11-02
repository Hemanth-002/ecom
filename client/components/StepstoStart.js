import React from "react";
import styled from "styled-components";
import { Card, CardTitle } from "./FeatureCard";
import { stepsToStart } from "../constants/constants";
import { Section2 } from "./Features";

const Container = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  padding: 2rem 0 2rem;
  left: 0;
  top: 113.5rem;
  width: 100%;
  color: #eee;
  z-index: 2;
  background-color: ${(props) => props?.bg};
`;

const Title = styled.h1`
  font-size: 2.865rem;
  line-height: 3.5rem;
  padding: 0.5rem 0 2rem;
  text-align: center;
  margin: 0;
`;

export const StepsCard = styled(Card)`
  align-items: flex-start;
  background-color: #111;
`;

export const Step = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: center;
  font-size: 2rem;
  font-weight: 600;
  width: 3.875rem;
  height: 3.875rem;
  margin: 0px;
  min-height: 10px;
  min-width: 16px;
  margin: 0;
  border-radius: 100px 100px 100px 100px;
  position: relative;
  color: #111;
`;

const Section = styled(Section2)`
  color: #eeeeee7f;
  margin: 0;
  font-weight: 400;
`;

export const StepstoStart = () => {
  return (
    <Container bg={"#111"}>
      <Title>Super Easy to Start</Title>
      {stepsToStart.map(({ id, title, description }) => (
        <StepsCard key={id}>
          <Step>{id}</Step>
          <CardTitle>{title}</CardTitle>
          <Section>{description}</Section>
        </StepsCard>
      ))}
    </Container>
  );
};
