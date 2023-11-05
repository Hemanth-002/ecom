import { Features } from "./Features";
import { StepstoStart } from "./StepstoStart";
import HeroWrapper from "./HeroWrapper";
import { HeroPageData } from "../constants/constants";

const Hero = () => {
  return (
    <>
      <HeroWrapper {...HeroPageData} />
      <Features />
      <StepstoStart />
    </>
  );
};

export default Hero;
