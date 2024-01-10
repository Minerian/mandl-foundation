import InvolvedBox from "../sections/involvedBox/involvedBox";
import BlogSlider from "../sections/blogSlider/blogSlider";
import Logos from "../sections/home/logos/logos";

import Logo1 from "../assets/logos/logo1.svg";
import Logo2 from "../assets/logos/logo2.svg";
import Logo3 from "../assets/logos/logo3.svg";
import Logo4 from "../assets/logos/logo4.svg";
import AboutHero from "../sections/about/aboutHero/aboutHero";
import AboutUs from "../sections/about/aboutUs/aboutUs";

const content1 = [Logo1, Logo2, Logo3, Logo4, Logo1, Logo2, Logo3, Logo4];

const About = () => {
  return (
    <div>
      <AboutHero />

      <Logos title={""} list={content1} />

      <AboutUs />

      <BlogSlider />

      <InvolvedBox />
    </div>
  );
};

export default About;
