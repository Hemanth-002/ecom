import React from "react";
import styled from "styled-components";
import ButtonPrimary from "./ButtonPrimary";

const HeroWrap = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

export const HeroHeader = styled.h1`
  font-size: 4.375rem;
  line-height: 5rem;
  text-align: left;
  margin: 0;
  padding: 50px 0px 28px 0px;
`;

const HeroSplit = styled.div`
  display: flex;
  max-width: 46%;
  flex-direction: column;
`;
export const SubHeader = styled.p`
  font-size: 1.125rem;
  line-height: 1.75rem;
  text-align: left;
  padding: 0px 0px 24px 0px;
`;

const HeroImage = styled.img`
  width: auto;
  object-fit: contain;
  height: 37.5rem;
`;

const HeroWrapper = ({ title, subTitle, buttonText, imgUrl }) => {
  return (
    <HeroWrap>
      <HeroSplit>
        <HeroHeader>{title}</HeroHeader>
        <SubHeader>{subTitle}</SubHeader>
        <ButtonPrimary text={buttonText} />
      </HeroSplit>
      <HeroSplit>
        <HeroImage src={imgUrl} />
      </HeroSplit>
    </HeroWrap>
  );
};

export default HeroWrapper;
