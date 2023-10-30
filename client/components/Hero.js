import styled from "styled-components";
import ButtonPrimary from "./ButtonPrimary";

const HeroWrap = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const HeroSplit = styled.div`
  display: flex;
  max-width: 46%;
  flex-direction: column;
`;

const HeroHeader = styled.h1`
  font-size: 4.375rem;
  line-height: 5rem;
  text-align: left;
  margin: 0;
  padding: 50px 0px 28px 0px;
`;

const SubHeader = styled.p`
  font-size: 1.125rem;
  line-height: 1.75rem;
  text-align: left;
  padding: 0px 0px 24px 0px;
`;

const HeroImage = styled.img`
  width: auto;
  height: 37.5rem;
`;

const Hero = () => {
  return (
    <HeroWrap>
      <HeroSplit>
        <HeroHeader>Shop the Latest Trends in Fashion</HeroHeader>
        <SubHeader>
          Discover the newest fashion trends and shop the latest styles at
          Shopee. From casual wear to party outfits, we have everything you need
          to look your best. Our wide range of clothing options ensures that you
          will find the perfect fit for any occasion. Join the Shopee community
          and start shopping today!
        </SubHeader>
        <ButtonPrimary text={"Shop Now"} />
      </HeroSplit>
      <HeroSplit>
        <HeroImage src="https://res.cloudinary.com/storylens/image/upload/v1698557773/prgs7jdg2ntsexe8ybv2.jpg" />
      </HeroSplit>
    </HeroWrap>
  );
};

export default Hero;
