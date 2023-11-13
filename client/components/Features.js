import React from "react";
import styled from "styled-components";
import { featureCardData, styleTypes } from "../constants/constants";
import ButtonPrimary from "./ButtonPrimary";
import { FeatureCard } from "./FeatureCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  right: 0;
  margin: 2rem 0 0;
  padding: 3rem 4.75rem 5rem;
  background-color: ${(props) => props?.bg || "#55555519"};
`;

const Title = styled.p`
  display: flex;
  justify-content: center;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 400;
`;

const StyleTypes = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
  justify-content: space-around;
`;

const Types = styled.h1`
  font-family: ${(props) => props.font};
  font-size: 2.25rem;
  line-height: 2.875rem;
`;

const SubContainer = styled.div`
  display: flex;
  height: fit-content;
  margin-bottom: 3rem;
`;

const Section1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 50%;
`;

export const Section2 = styled.p`
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.75rem;
  margin-bottom: 0;
`;

const SectionHeader = styled.h1`
  font-size: 3.565rem;
  line-height: 5rem;
  padding: 0.5rem 0 2rem;
  text-align: left;
  margin: 0;
`;

export const Features = () => {
  return (
    <Container>
      <Title>Trusted by Fashion Enthusiasts Worldwide</Title>
      <StyleTypes>
        {styleTypes.map((item) => (
          <Types key={item.id} font={item.font}>
            {item.name}
          </Types>
        ))}
      </StyleTypes>
      <SubContainer>
        <Section1>
          <Section2>Fashion Forward</Section2>
          <SectionHeader>Discover Your Style</SectionHeader>
          <ButtonPrimary text={"GET IN TOUCH"} />
        </Section1>
        <Section2>
          At Shopee, we believe that fashion is an expression of your unique
          style. That's why we offer a wide range of clothing options for every
          taste and trend. From classic staples to the latest fashion
          must-haves, our collection is curated to help you discover your
          individual style and make a statement wherever you go.
        </Section2>
      </SubContainer>
      <StyleTypes>
        {featureCardData.map(({ id, image, title, description }) => (
          <FeatureCard
            key={id}
            imgUrl={image}
            title={title}
            desctiption={description}
          />
        ))}
      </StyleTypes>
    </Container>
  );
};
