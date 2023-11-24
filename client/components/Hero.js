import Router from "next/router";
import { Features } from "./Features";
import { StepstoStart } from "./StepstoStart";
import HeroWrapper from "./HeroWrapper";
import { HeroPageData } from "../constants/constants";

const Hero = () => {
  const handleNext = () => {
    Router.push({
      pathname: `/products`,
    });
  };

  return (
    <>
      <HeroWrapper {...HeroPageData} handleNext={handleNext} />
      <Features />
      <StepstoStart />
    </>
  );
};

export default Hero;
