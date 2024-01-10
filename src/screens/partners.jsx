import Hero from "../sections/home/hero/hero";
import InvolvedBox from "../sections/involvedBox/involvedBox";
import AllPartners from "../sections/partners/allPartners/allPartners";
import PartnersLogo from "../sections/partners/partnersLogos/partnersLogos";

const Partners = () => {
  return (
    <>
      <Hero
        title="Philanthropic Allies"
        desc="Spotlighting the Generosity of Partners Supporting Our Mission of Positive Change"
      />
      <PartnersLogo />
      <AllPartners />

      <InvolvedBox />
    </>
  );
};

export default Partners;
